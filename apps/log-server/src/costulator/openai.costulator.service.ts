import { LogSources } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import OpenAI from "openai/index";
import { get_encoding } from "tiktoken";

import { LLMProvider, LogCostInput, LogCostOutput } from "./llm-provider.interface";
import { Pricing } from "./types";


@Injectable()
export class OpenAICostulatorService implements LLMProvider {
  source = LogSources.OPENAI;

  private pricing: Record<string, Pricing> = {
    "gpt-4-0125-preview": {
      input1K: 0.01,
      output1K: 0.03,
    },
    "gpt-4-1106-preview": {
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

  calculateLogCost(params: LogCostInput): LogCostOutput {
    const { input1K, output1K } = this.pricing[params.model];
    const inputCost = this.getCostOfTokens(params.inputTokens, input1K);
    const outputCost = this.getCostOfTokens(params.outputTokens, output1K);
    const totalCost = inputCost + outputCost;
    return { inputCost, outputCost, totalCost };
  }

  countInputTokens(input: OpenAI.ChatCompletionCreateParams): number {
    const roleHandlers: Record<
      OpenAI.ChatCompletionRole,
      (accum: string, curr: OpenAI.ChatCompletionMessageParam) => string
    > = {
      system: (accum, curr) => accum + curr.content,
      // TODO handle image uploads for user
      user: (accum, curr) => (typeof curr.content === "string" ? accum + curr.content : accum),
      assistant: (accum, curr) => accum + (curr.content || ""),
      tool: (accum, curr) => accum + curr.content,
      function: (accum, curr) => accum + (curr.content || ""),
    };

    const stringifiedMessages = input.messages.reduce((accum: string, curr) => {
      if (roleHandlers[curr.role]) {
        return roleHandlers[curr.role](accum, curr);
      }
      return accum;
    }, "");

    return this.getTokenCount(stringifiedMessages);
  }

  countOutputTokens(output: OpenAI.ChatCompletion): number {
    const outputString = output.choices[0].message.content || "";
    return this.getTokenCount(outputString);
  }

  private getTokenCount(x: string): number {
    const enc = get_encoding("gpt2");
    const tokens = enc.encode(x).length;
    enc.free();
    return tokens;
  }

  private getCostOfTokens(tokens: number, pricePer1K: number): number {
    return (tokens / 1000) * pricePer1K;
  }
}
