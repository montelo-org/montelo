import MistralClient, {
  ChatCompletionResponse,
  ChatCompletionResponseChunk,
  Function,
  ResponseFormat,
  ToolCalls,
  ToolChoice,
} from "@mistralai/mistralai";
import { LogSources } from "@montelo/db";

import { MonteloClient } from "../MonteloClient";
import { LogInput } from "../client";
import { MistralClientOptions } from "../types";
import { MonteloLogExtend } from "./types";
import { encodingForModel, TiktokenModel } from "js-tiktoken";

type MistralChatOptions = {
  model: string;
  messages: Array<{
    role: string;
    name?: string;
    content: string | string[];
    tool_calls?: ToolCalls[];
  }>;
  tools?: Array<{ type: string; function: Function }>;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  randomSeed?: number;
  /**
   * @deprecated use safePrompt instead
   */
  safeMode?: boolean;
  safePrompt?: boolean;
  toolChoice?: ToolChoice;
  responseFormat?: ResponseFormat;
};

type MistralChatOptionsWithMontelo = MistralChatOptions & MonteloLogExtend;

export class ExtendedMistral extends MistralClient {
  private monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient, mistralOptions?: MistralClientOptions) {
    super(mistralOptions?.apiKey, mistralOptions?.endpoint);

    this.monteloClient = monteloClient;
  }

  async chat(options: MistralChatOptionsWithMontelo): Promise<ChatCompletionResponse> {
    const { name, extra, ...optionsWithoutMonteloParams } = options;
    const startTime = new Date();

    // make the chat request
    const response = await super.chat(optionsWithoutMonteloParams);

    const endTime = new Date();
    const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);

    void this.logToDatabase(
      options,
      {
        model: options.model,
        content: response.choices[0].message,
        usage: response.usage,
      },
      {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: parseFloat(duration),
      },
    );
    return response;
  }

  async *chatStream(
    options: MistralChatOptionsWithMontelo,
  ): AsyncGenerator<ChatCompletionResponseChunk, void, unknown> {
    const { name, extra, ...optionsWithoutMonteloParams } = options;
    const startTime = new Date();
    const chunks: ChatCompletionResponseChunk[] = [];

    // Call the original chatStream function
    for await (const chunk of super.chatStream(optionsWithoutMonteloParams)) {
      chunks.push(chunk);
      yield chunk;
    }

    const endTime = new Date();
    const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);

    const finalContent = chunks.reduce((acc, chunk) => {
      const content = chunk.choices[0].delta.content;
      if (content) {
        acc += content;
      }
      return acc;
    }, "");

    const concattedInput = options.messages.reduce((accum, curr) => {
      return accum + curr.content;
    }, "");

    function getNumberOfTokens(text: string, modelIdentifier: TiktokenModel): number {
      // Get the encoding for the specified model
      const enc = encodingForModel(modelIdentifier);

      // Encode the text
      const encodedText = enc.encode(text);

      // Return the number of tokens
      return encodedText.length;
    }

    // USING OPENAI TOKENIZER
    // TODO: Replace with Mistral tokenizer
    const inputTokens = getNumberOfTokens(concattedInput, "gpt-4");
    const outputTokens = getNumberOfTokens(finalContent, "gpt-4");
    const totalTokens = inputTokens + outputTokens;

    // token counts
    const usage = {
      prompt_tokens: inputTokens,
      completion_tokens: outputTokens,
      total_tokens: totalTokens,
    };

    await this.logToDatabase(
      options,
      {
        model: options.model,
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

  private async logToDatabase(
    input: MistralChatOptionsWithMontelo,
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
      source: LogSources.MISTRAL,
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
