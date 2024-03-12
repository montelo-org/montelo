export type Pricing = {
  /**
   * Price per 1k tokens
   */
  input1K: number;
  /**
   * price per 1k tokens
   */
  output1K: number;
};

export type NullableCost = {
  inputCost: number | null;
  outputCost: number | null;
  totalCost: number | null;
};

export type TraceMetrics = {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
};
