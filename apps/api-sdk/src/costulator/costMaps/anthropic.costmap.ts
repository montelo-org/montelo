import { Pricing } from "../types";


export const AnthropicCostMap: Record<string, Pricing> = {
  "claude-3-opus-20240229": {
    input1K: 0.015,
    output1K: 0.075,
  },
  "claude-3-sonnet-20240229": {
    input1K: 0.003,
    output1K: 0.015,
  },
  "claude-2.1": {
    input1K: 0.008,
    output1K: 0.024,
  },
  "claude-2.0": {
    input1K: 0.008,
    output1K: 0.024,
  },
  "claude-instant-1.2": {
    input1K: 0.0008,
    output1K: 0.0024,
  },
};

export const AnthropicCostMapKeys = Object.keys(AnthropicCostMap);
