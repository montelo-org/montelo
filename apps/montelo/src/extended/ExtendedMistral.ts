import MistralClient, { ChatCompletionResponse, ChatCompletionResponseChunk, EmbeddingResponse, Function, ListModelsResponse, ResponseFormat, TokenUsage, ToolCalls, ToolChoice } from "@mistralai/mistralai";
import { MonteloClient } from "../MonteloClient";
import { LogInput, LogInputSourceEnum } from "../client";
import { MistralClientOptions } from "../types";
import { MonteloLogExtend, separateExtend } from "./types";


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

/**
 * Composition over inheritance
 *
 * Because the MistralClient is dogshit: https://github.com/mistralai/client-js/issues/58
 */
export class ExtendedMistral {
  private mistralClient: MistralClient;
  private monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient, mistralOptions?: MistralClientOptions) {
    this.mistralClient = new MistralClient(
      mistralOptions?.apiKey || process.env.MISTRAL_API_KEY,
      mistralOptions?.endpoint,
    );
    this.monteloClient = monteloClient;
  }

  async chat(options: MistralChatOptionsWithMontelo): Promise<ChatCompletionResponse> {
    const { base, extend } = separateExtend(options);
    const startTime = new Date();

    // make the chat request
    const response = await this.mistralClient.chat(base);

    const endTime = new Date();
    const duration = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);

    const { usage, ...output } = response;

    void this.logToDatabase(base, extend, output, usage, {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration: parseFloat(duration),
    });

    return response;
  }

  async *chatStream(
    options: MistralChatOptionsWithMontelo,
  ): AsyncGenerator<ChatCompletionResponseChunk, void, unknown> {
    const { base, extend } = separateExtend(options);

    const startTime = new Date();
    const chunks: ChatCompletionResponseChunk[] = [];

    // Call the original chatStream function
    for await (const chunk of this.mistralClient.chatStream(base)) {
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

    const data: Omit<ChatCompletionResponse, "usage"> = {
      id: chunks[0].id,
      model: chunks[0].model,
      object: "chat.completion",
      created: chunks[0].created,
      choices: [
        {
          index: chunks[0].choices[0].index,
          message: {
            role: "assistant",
            content: finalContent,
          },
          finish_reason: chunks[0].choices[0].finish_reason || "stop",
        },
      ],
    };

    await this.logToDatabase(base, extend, data, undefined, {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration: parseFloat(duration),
    });
  }

  async embeddings(options: { model: string; input: string | string[] }): Promise<EmbeddingResponse> {
    return this.mistralClient.embeddings(options);
  }

  async listModels(): Promise<ListModelsResponse> {
    return this.mistralClient.listModels();
  }

  private async logToDatabase(
    base: MistralChatOptions,
    extend: MonteloLogExtend,
    output: Omit<ChatCompletionResponse, "usage">,
    usage: TokenUsage | undefined,
    time: {
      startTime: string;
      endTime: string;
      duration: number;
    },
  ): Promise<void> {
    const log: LogInput = {
      ...time,
      ...extend,
      ...(usage && {
        tokens: {
          inputTokens: usage.prompt_tokens,
          outputTokens: usage.completion_tokens,
          totalTokens: usage.total_tokens,
        },
      }),
      source: LogInputSourceEnum.Mistral,
      model: output.model,
      input: base,
      output,
    };
    await this.monteloClient.createLog(log);
  }
}
