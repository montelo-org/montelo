import { LogSources } from "@montelo/db";
import OpenAI, { ClientOptions as OpenAIClientOptions } from "openai";
import { APIPromise, RequestOptions } from "openai/core";
import { Chat } from "openai/resources";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { Stream } from "openai/streaming";



import { MonteloClient } from "../MonteloClient";
import { LogInput } from "../client";
import { MonteloLogExtend, separateExtend } from "./types";

import ChatCompletion = Chat.ChatCompletion;

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

    const { base, extend } = separateExtend(body);
    const originalPromise = super.create(base, options);

    if ("stream" in base && base.stream) {
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

        void this.logToDatabase(base, extend, data as OpenAI.ChatCompletion, {
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration: parseFloat(duration),
        });
        return data;
      });
    }
  }

  private augmentStream(
    originalStream: Stream<OpenAI.ChatCompletionChunk>,
    startTime: Date,
    base: ChatCompletionCreateParamsBase,
    extend: MonteloLogExtend,
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

      const data: ChatCompletion = {
        id: chunks[0].id,
        system_fingerprint: chunks[0].system_fingerprint,
        created: chunks[0].created,
        model: chunks[0].model,
        usage: undefined,
        object: "chat.completion",
        choices: [
          {
            index: chunks[0].choices[0].index,
            logprobs: chunks[0].choices[0].logprobs || null,
            finish_reason: chunks[0].choices[0].finish_reason || "stop",
            message: {
              content: finalContent,
              role: "assistant",
            },
          },
        ],
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
    base: ChatCompletionCreateParamsBase,
    extend: MonteloLogExtend,
    output: OpenAI.ChatCompletion,
    time: {
      startTime: string;
      endTime: string;
      duration: number;
    },
  ): Promise<void> {
    const log: LogInput = {
      ...time,
      ...extend,
      ...(output.usage && {
        tokens: {
          inputTokens: output.usage.prompt_tokens,
          outputTokens: output.usage.completion_tokens,
          totalTokens: output.usage.total_tokens,
        },
      }),
      source: LogSources.OPENAI,
      model: output.model,
      input: base,
      output,
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
