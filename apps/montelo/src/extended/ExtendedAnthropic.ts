import Anthropic, { ClientOptions as AnthropicClientOptions } from "@anthropic-ai/sdk";
import { APIPromise } from "@anthropic-ai/sdk/core";
import { MessageCreateParamsBase, MessageStream } from "@anthropic-ai/sdk/resources/messages";
import { Stream } from "@anthropic-ai/sdk/streaming";
import { MonteloClient } from "../MonteloClient";
import { LogInput, LogInputSourceEnum } from "../client";
import { MonteloLogExtend, separateExtend } from "./types";


class ExtendedMessages extends Anthropic.Messages {
  private monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient, anthropic: Anthropic) {
    super(anthropic);

    this.monteloClient = monteloClient;
  }

  create(
    body: Anthropic.MessageCreateParamsNonStreaming & MonteloLogExtend,
    options?: Anthropic.RequestOptions<unknown>,
  ): APIPromise<Anthropic.Message>;
  create(
    body: Anthropic.MessageCreateParamsStreaming & MonteloLogExtend,
    options?: Anthropic.RequestOptions<unknown>,
  ): APIPromise<Stream<Anthropic.MessageStreamEvent>>;
  create(
    body: MessageCreateParamsBase & MonteloLogExtend,
    options?: Anthropic.RequestOptions<unknown>,
  ): APIPromise<Stream<Anthropic.MessageStreamEvent> | Anthropic.Message>;
  create(
    body: Anthropic.MessageCreateParams & MonteloLogExtend,
    options?: Anthropic.RequestOptions<unknown>,
  ): APIPromise<Anthropic.Message> | APIPromise<Stream<Anthropic.MessageStreamEvent>> {
    const startTime = new Date();

    const { base, extend } = separateExtend(body);
    const originalPromise = this._client.post("/v1/messages", {
      body: base,
      timeout: 600000,
      ...options,
      stream: body.stream ?? false,
    }) as APIPromise<Anthropic.Message> | APIPromise<Stream<Anthropic.MessageStreamEvent>>;

    if (body.stream) {
      // @ts-ignore
      return originalPromise.then((originalStream) => {
        // @ts-ignore
        return this.augmentStream(originalStream, startTime, base, extend);
      });
    } else {
      // @ts-ignore
      return originalPromise.then((data) => {
        const endTime = new Date();
        const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);

        void this.logToDatabase(base, extend, data as Anthropic.Message, {
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration: parseFloat(duration),
        });
        return data;
      });
    }
  }

  /**
   * Create a Message stream
   */
  stream(body: Anthropic.MessageStreamParams, options?: Anthropic.RequestOptions<unknown>): MessageStream {
    return MessageStream.createMessage(this, body, options);
  }

  private augmentStream(
    originalStream: Stream<Anthropic.MessageStreamEvent>,
    startTime: Date,
    base: Anthropic.MessageCreateParams,
    extend: MonteloLogExtend,
  ): Stream<Anthropic.MessageStreamEvent> {
    const self = this;

    async function* augmentedIterator() {
      const chunks: Anthropic.MessageStreamEvent[] = [];
      for await (const item of originalStream) {
        chunks.push(item);
        yield item;
      }

      // Once all items are consumed, perform logging
      const endTime = new Date();
      const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);

      type FinalContent = {
        id: string;
        model: string;
        content: string;
        inputTokens: number;
        outputTokens: number;
      };
      const finalContent = chunks.reduce(
        (accum, chunk) => {
          switch (chunk.type) {
            case "message_start":
              return {
                id: chunk.message.id,
                inputTokens: chunk.message.usage.input_tokens,
                outputTokens: chunk.message.usage.output_tokens,
                model: chunk.message.model,
                content: "",
              };
            case "message_stop":
              return accum;
            case "message_delta":
              return { ...accum, outputTokens: accum.outputTokens + chunk.usage.output_tokens };
            case "content_block_start":
              return { ...accum, content: accum.content + chunk.content_block.text };
            case "content_block_stop":
              return { ...accum };
            case "content_block_delta":
              return { ...accum, content: accum.content + chunk.delta.text };
            default:
              return accum;
          }
        },
        {
          id: "",
          inputTokens: 0,
          outputTokens: 0,
          content: "",
          model: "",
        } as FinalContent,
      );

      const data: Anthropic.Message = {
        id: finalContent.id,
        type: "message",
        role: "assistant",
        stop_reason: "end_turn",
        stop_sequence: null,
        model: finalContent.model,
        content: [{ type: "text", text: finalContent.content }],
        usage: { input_tokens: finalContent.inputTokens, output_tokens: finalContent.outputTokens },
      };

      await self.logToDatabase(base, extend, data, {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: parseFloat(duration),
      });
    }

    // Return a new Stream instance wrapping the augmented iterator
    // Assuming Stream can be constructed with an AsyncGenerator function directly
    return new Stream(augmentedIterator, originalStream.controller);
  }

  private async logToDatabase(
    base: Anthropic.MessageCreateParams,
    extend: MonteloLogExtend,
    output: Anthropic.Message,
    time: {
      startTime: string;
      endTime: string;
      duration: number;
    },
  ): Promise<void> {
    const log: LogInput = {
      ...time,
      ...extend,
      tokens: {
        inputTokens: output.usage.input_tokens,
        outputTokens: output.usage.output_tokens,
        totalTokens: output.usage.input_tokens + output.usage.output_tokens,
      },
      source: LogInputSourceEnum.Anthropic,
      model: output.model,
      input: base,
      output,
    };
    void this.monteloClient.createLog(log);
  }
}

export class ExtendedAnthropic extends Anthropic {
  messages: ExtendedMessages;

  constructor(monteloClient: MonteloClient, anthropicClientOptions?: AnthropicClientOptions) {
    super(anthropicClientOptions);

    this.messages = new ExtendedMessages(monteloClient, this);
  }
}
