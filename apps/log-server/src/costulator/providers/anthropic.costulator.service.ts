import Anthropic from "@anthropic-ai/sdk";
import { LogSources } from "@montelo/db";
import { Injectable, Logger } from "@nestjs/common";
import { AnthropicCostMap, AnthropicCostMapKeys } from "../costMaps/anthropic.costmap";
import { LLMProvider, LogCostInput, LogCostOutput } from "../llm-provider.interface";


@Injectable()
export class AnthropicCostulatorService implements LLMProvider {
  source = LogSources.ANTHROPIC;
  private logger = new Logger(AnthropicCostulatorService.name);

  calculateLogCost(params: LogCostInput): LogCostOutput {
    this.logger.log(`Calculating cost for Anthropic model ${params.model}`);

    if (!AnthropicCostMapKeys.includes(params.model)) {
      this.logger.error(`Model ${params.model} not found in pricing`);
      return { inputCost: 0, outputCost: 0, totalCost: 0 };
    }

    const { input1K, output1K } = AnthropicCostMap[params.model];
    const inputCost = this.getCostOfTokens(params.inputTokens, input1K);
    const outputCost = this.getCostOfTokens(params.outputTokens, output1K);
    const totalCost = inputCost + outputCost;
    return { inputCost, outputCost, totalCost };
  }

  countInputTokens(_: Anthropic.MessageCreateParams, output: Anthropic.Message): number {
    return output.usage.input_tokens;
  }

  countOutputTokens(output: Anthropic.Message): number {
    return output.usage.output_tokens;
  }

  private getCostOfTokens(tokens: number, pricePer1K: number): number {
    return (tokens / 1000) * pricePer1K;
  }
}
