/* eslint-disable no-unused-vars */

/* eslint-disable unused-imports/no-unused-vars */
import type OpenAI from "openai";

export type ChatMessage = OpenAI.ChatCompletionMessageParam;

export abstract class AbstractModelProvider {
  public readonly model: string;
  public readonly client: any;

  constructor({ model, apiKey }: { model: string; apiKey: string }) {
    this.model = model;
    this.client = {};
  }

  public async chatCompletion(messages: ChatMessage[]): Promise<OpenAI.ChatCompletion> {
    return {} as any;
  }
}
