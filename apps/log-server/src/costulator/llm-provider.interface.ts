import { LogSources } from "@montelo/db";

export type LogCostOutput = {
  inputCost: number;
  outputCost: number;
  totalCost: number;
};

export type LogCostInput = {
  model: string;
  inputTokens: number;
  outputTokens: number;
};

export interface LLMProvider {
  source: LogSources;

  countInputTokens(input: any): number;

  countOutputTokens(output: any): number;

  calculateLogCost(params: LogCostInput): LogCostOutput;
}
