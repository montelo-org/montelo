import { Pricing } from "../types";

export const MistralCostMap: Record<string, Pricing> = {
  "open-mistral-7b": {
    input1K: 0.00025,
    output1K: 0.00025,
  },
  "mistral-tiny-2312": {
    input1K: 0.00025,
    output1K: 0.00025,
  },
  "mistral-tiny": {
    input1K: 0.00025,
    output1K: 0.00025,
  },
  "open-mixtral-8x7b": {
    input1K: 0.0007,
    output1K: 0.0007,
  },
  "mistral-small-2312": {
    input1K: 0.002,
    output1K: 0.006,
  },
  "mistral-small": {
    input1K: 0.002,
    output1K: 0.006,
  },
  "mistral-small-2402": {
    input1K: 0.002,
    output1K: 0.006,
  },
  "mistral-small-latest": {
    input1K: 0.002,
    output1K: 0.006,
  },
  "mistral-medium-latest": {
    input1K: 0.0027,
    output1K: 0.0081,
  },
  "mistral-medium-2312": {
    input1K: 0.0027,
    output1K: 0.0081,
  },
  "mistral-medium": {
    input1K: 0.0027,
    output1K: 0.0081,
  },
  "mistral-large-latest": {
    input1K: 0.008,
    output1K: 0.024,
  },
  "mistral-large-2402": {
    input1K: 0.008,
    output1K: 0.024,
  },
};

export const MistralCostMapKeys = Object.keys(MistralCostMap);
