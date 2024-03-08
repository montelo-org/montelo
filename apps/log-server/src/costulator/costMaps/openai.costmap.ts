import { Pricing } from "../types";

export const OpenAICostMap: Record<string, Pricing> = {
  "gpt-4-0125-preview": {
    input1K: 0.01,
    output1K: 0.03,
  },
  "gpt-4-1106-preview": {
    input1K: 0.01,
    output1K: 0.03,
  },
  "gpt-4-1106-vision-preview": {
    input1K: 0.01,
    output1K: 0.03,
  },
  "gpt-4-vision-preview": {
    input1K: 0.01,
    output1K: 0.03,
  },
  "gpt-4": {
    input1K: 0.03,
    output1K: 0.06,
  },
  "gpt-4-0314": {
    input1K: 0.03,
    output1K: 0.06,
  },
  "gpt-4-0613": {
    input1K: 0.03,
    output1K: 0.06,
  },
  "gpt-4-32k": {
    input1K: 0.06,
    output1K: 0.12,
  },
  "gpt-4-32k-0314": {
    input1K: 0.06,
    output1K: 0.12,
  },
  "gpt-4-32k-0613": {
    input1K: 0.06,
    output1K: 0.12,
  },
  "gpt-3.5-turbo": {
    input1K: 0.001,
    output1K: 0.002,
  },
  "gpt-3.5-turbo-16k": {
    input1K: 0.003,
    output1K: 0.004,
  },
  "gpt-3.5-turbo-0301": {
    input1K: 0.0015,
    output1K: 0.002,
  },
  "gpt-3.5-turbo-0613": {
    input1K: 0.0015,
    output1K: 0.002,
  },
  "gpt-3.5-turbo-1106": {
    input1K: 0.001,
    output1K: 0.002,
  },
  "gpt-3.5-turbo-0125": {
    input1K: 0.0005,
    output1K: 0.00015,
  },
  "gpt-3.5-turbo-16k-0613": {
    input1K: 0.003,
    output1K: 0.004,
  },
};

export const OpenAICostMapKeys = Object.keys(OpenAICostMap);