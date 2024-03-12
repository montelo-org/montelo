import { ChatCompletionResponse, ResponseFormat, ToolCalls, ToolChoice } from "@mistralai/mistralai";
import { LogSources } from "@montelo/db";
import { Injectable, Logger } from "@nestjs/common";
import { MistralTokenizer } from "mistral-tokenizer-ts";
import { MistralCostMap, MistralCostMapKeys } from "../costMaps/mistral.costmap";
import { LLMProvider, LogCostInput, LogCostOutput } from "../llm-provider.interface";

const tokenizer = new MistralTokenizer();

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
  safeMode?: boolean;
  safePrompt?: boolean;
  toolChoice?: ToolChoice;
  responseFormat?: ResponseFormat;
};

@Injectable()
export class MistralCostulatorService implements LLMProvider {
  source = LogSources.MISTRAL;
  private logger = new Logger(MistralCostulatorService.name);

  calculateLogCost(params: LogCostInput): LogCostOutput {
    this.logger.log("Calculating cost for Mistral model", params.model);

    if (!MistralCostMapKeys.includes(params.model)) {
      this.logger.error("Model not found in pricing", params.model);
      return { inputCost: 0, outputCost: 0, totalCost: 0 };
    }

    const { input1K, output1K } = MistralCostMap[params.model];
    const inputCost = this.getCostOfTokens(params.inputTokens, input1K);
    const outputCost = this.getCostOfTokens(params.outputTokens, output1K);
    const totalCost = inputCost + outputCost;
    return { inputCost, outputCost, totalCost };
  }

  countInputTokens(input: MistralChatOptions): number {
    const stringifiedMessages = input.messages.reduce((accum: string, curr) => {
      return accum + curr.content;
    }, "");

    return this.getTokenCount(stringifiedMessages);
  }

  countOutputTokens(output: ChatCompletionResponse): number {
    const outputString = output.choices[0].message.content || "";
    return this.getTokenCount(outputString);
  }

  private getTokenCount(x: string): number {
    return tokenizer.encode(x).length;
  }

  private getCostOfTokens(tokens: number, pricePer1K: number): number {
    return (tokens / 1000) * pricePer1K;
  }
}
