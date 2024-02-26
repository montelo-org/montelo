import { LogTypes } from "@montelo/db";
import { TiktokenModel, encodingForModel } from "js-tiktoken";
import OpenAI, { ClientOptions as OpenAIClientOptions } from "openai";
import { APIPromise, RequestOptions } from "openai/core";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { Stream } from "openai/streaming";

import { MonteloClient } from "../MonteloClient";
import { LogInput } from "../client";
import { MonteloLogExtend } from "./types";

class ExtendedChatCompletions extends OpenAI.Chat.Completions {
  private monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient, openAIOptions: OpenAI) {
    super(openAIOptions);

    this.monteloClient = monteloClient;
  }

  create(
    body: OpenAI.ChatCompletionCreateParamsNonStreaming & MonteloLogExtend,
    options?: RequestOptions,
  ): APIPromise<OpenAI.ChatCompletion>;
  create(
    body: OpenAI.ChatCompletionCreateParamsStreaming & MonteloLogExtend,
    options?: RequestOptions,
  ): APIPromise<Stream<OpenAI.ChatCompletionChunk>>;
  create(
    body: ChatCompletionCreateParamsBase & MonteloLogExtend,
    options?: RequestOptions,
  ): APIPromise<Stream<OpenAI.ChatCompletionChunk> | OpenAI.ChatCompletion>;

  create(
    body: ChatCompletionCreateParamsBase & MonteloLogExtend,
    options?: RequestOptions,
  ): APIPromise<OpenAI.ChatCompletion | Stream<OpenAI.ChatCompletionChunk>> {
    const startTime = new Date();

    const { name, ...bodyWithoutMonteloParams } = body;
    const originalPromise = super.create(bodyWithoutMonteloParams, options);

    if ("stream" in body && body.stream) {
      // @ts-ignore
      return originalPromise.then((originalStream) => {
        // @ts-ignore
        return this.augmentStream(originalStream, startTime, body);
      });
    } else {
      // @ts-ignore
      return originalPromise.then((data) => {
        const endTime = new Date();
        const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);

        // @ts-ignore
        void this.logToDatabase(
          body,
          {
            model: body.model,
            // @ts-ignore
            content: data.choices[0],
            // @ts-ignore
            usage: data.usage,
          },
          {
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            duration: parseFloat(duration),
          },
        );
        return data;
      });
    }
  }

  private augmentStream(
    originalStream: Stream<OpenAI.ChatCompletionChunk>,
    startTime: Date,
    body: ChatCompletionCreateParamsBase & MonteloLogExtend,
  ): Stream<OpenAI.ChatCompletionChunk> {
    const self = this;

    async function* augmentedIterator() {
      const chunks: OpenAI.ChatCompletionChunk[] = [];
      for await (const item of originalStream) {
        chunks.push(item);
        yield item;
      }

      // Once all items are consumed, perform logging
      const endTime = new Date();
      const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);

      const finalContent = chunks.reduce((acc, chunk) => {
        const content = chunk.choices[0].delta.content;
        if (content) {
          acc += content;
        }
        return acc;
      }, "");

      function getNumberOfTokens(text: string, modelIdentifier: TiktokenModel): number {
        // Get the encoding for the specified model
        const enc = encodingForModel(modelIdentifier);

        // Encode the text
        const encodedText = enc.encode(text);

        // Return the number of tokens
        return encodedText.length;
      }

      const concattedInput = body.messages.reduce((accum, curr) => {
        return accum + curr.content;
      }, "");
      const inputTokens = getNumberOfTokens(concattedInput, body.model as TiktokenModel);
      const outputTokens = getNumberOfTokens(finalContent, body.model as TiktokenModel);
      const totalTokens = inputTokens + outputTokens;

      // token counts
      const usage = {
        prompt_tokens: inputTokens,
        completion_tokens: outputTokens,
        total_tokens: totalTokens,
      };

      await self.logToDatabase(
        body,
        {
          model: body.model,
          content: { output: finalContent },
          usage,
        },
        {
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration: parseFloat(duration),
        },
      );
    }

    // Return a new Stream instance wrapping the augmented iterator
    // Assuming Stream can be constructed with an AsyncGenerator function directly
    return new Stream(augmentedIterator, originalStream.controller);
  }

  private async logToDatabase(
    input: ChatCompletionCreateParamsBase & MonteloLogExtend,
    output: {
      model: string;
      content: Record<string, any>;
      usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
      };
    },
    time: {
      startTime: string;
      endTime: string;
      duration: number;
    },
  ): Promise<void> {
    const log: LogInput = {
      ...time,
      type: LogTypes.OPENAI,
      name: input.name,
      model: output.model,
      inputTokens: output.usage?.prompt_tokens,
      outputTokens: output.usage?.completion_tokens,
      totalTokens: output.usage?.total_tokens,
      input: input.messages,
      output: output.content,
      extra: input.extra,
    };
    await this.monteloClient.createLog(log);
  }
}

class ExtendedChat extends OpenAI.Chat {
  completions: ExtendedChatCompletions;

  constructor(monteloClient: MonteloClient, openAIOptions: OpenAI) {
    super(openAIOptions);

    this.completions = new ExtendedChatCompletions(monteloClient, this._client);
  }
}

export class ExtendedOpenAI extends OpenAI {
  chat: ExtendedChat;

  constructor(monteloClient: MonteloClient, openAIOptions?: OpenAIClientOptions) {
    super(openAIOptions);

    this.chat = new ExtendedChat(monteloClient, this);
  }
}
