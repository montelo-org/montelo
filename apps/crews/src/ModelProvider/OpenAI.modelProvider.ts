import OpenAI from "openai";
import type { AbstractModelProvider, ChatMessage } from "./ModelProvider";

type OpenAIModels = OpenAI.ChatCompletionCreateParamsNonStreaming["model"];

export class OpenAIModelProvider implements AbstractModelProvider {
  public readonly model: OpenAIModels;
  public readonly client: OpenAI;

  constructor({ model, apiKey }: { model: OpenAIModels; apiKey: string }) {
    this.client = new OpenAI({ apiKey });
    this.model = model;
  }

  public async chatCompletion(
    messages: ChatMessage[]
  ): Promise<OpenAI.ChatCompletion> {
    const chatCompletion = await this.client.chat.completions.create({
      messages,
      model: this.model,
    });
    return chatCompletion;
  }
}
