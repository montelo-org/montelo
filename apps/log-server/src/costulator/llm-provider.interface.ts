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

  /**
   * Count the input tokens from the input object.
   * Sometimes the input tokens are directly available from the output object, so we pass it in.
   */
  countInputTokens(input: any, output: any): number;

  countOutputTokens(output: any): number;

  calculateLogCost(params: LogCostInput): LogCostOutput;
}
