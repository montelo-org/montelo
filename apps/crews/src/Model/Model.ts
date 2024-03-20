import { Montelo } from "montelo";
import OpenAI from "openai";

type OpenAIModels = OpenAI.ChatCompletionCreateParamsNonStreaming["model"];
export type ChatMessage = OpenAI.ChatCompletionMessageParam;

export class Model {
  public readonly modelName: OpenAIModels;
  public readonly client: OpenAI;

  constructor({ monteloClient, modelName }: { modelName: OpenAIModels; monteloClient: Montelo }) {
    // TODO: handle different providers
    this.client = monteloClient.openai;
    this.modelName = modelName;
  }

  public async chatCompletion(messages: ChatMessage[]): Promise<OpenAI.ChatCompletion> {
    const chatCompletion = await this.client.chat.completions.create({
      messages,
      model: this.modelName,
    });
    return chatCompletion;
  }
}
