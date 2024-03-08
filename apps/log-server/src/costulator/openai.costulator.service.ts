import { LogSources } from "@montelo/db";
import { Injectable, Logger } from "@nestjs/common";
import OpenAI from "openai/index";
import { get_encoding } from "tiktoken";
import { OpenAICostMap, OpenAICostMapKeys } from "./costMaps/openai.costmap";
import { LLMProvider, LogCostInput, LogCostOutput } from "./llm-provider.interface";


@Injectable()
export class OpenAICostulatorService implements LLMProvider {
  source = LogSources.OPENAI;
  private logger = new Logger(OpenAICostulatorService.name);

  calculateLogCost(params: LogCostInput): LogCostOutput {
    this.logger.log("Calculating cost for OpenAI model", params.model);

    if (!OpenAICostMapKeys.includes(params.model)) {
      this.logger.error("Model not found in pricing", params.model);
      return { inputCost: 0, outputCost: 0, totalCost: 0 };
    }

    const { input1K, output1K } = OpenAICostMap[params.model];
    const inputCost = this.getCostOfTokens(params.inputTokens, input1K);
    const outputCost = this.getCostOfTokens(params.outputTokens, output1K);
    const totalCost = inputCost + outputCost;
    return { inputCost, outputCost, totalCost };
  }

  countInputTokens(input: OpenAI.ChatCompletionCreateParams): number {
    const roleHandlers: Record<OpenAI.ChatCompletionRole, (accum: string, curr: any) => string> = {
      system: (accum, curr: OpenAI.ChatCompletionSystemMessageParam) => accum + curr.content,
      // TODO handle image uploads for user
      user: (accum, curr: OpenAI.ChatCompletionUserMessageParam) => {
        console.log("user", curr);
        // just a string
        if (typeof curr.content === "string") {
          return accum + curr.content;
        }

        // array of text/image_url
        const allStrings = curr.content.reduce((accum, curr) => {
          console.log("array curr", curr);
          if (curr.type === "text") {
            console.log("text, returning; ", curr.text);
            return accum + curr.text;
          } else if (curr.type === "image_url") {
            console.log("image_url", curr.image_url);
            if (curr.image_url.detail === "low") {
              console.log("low detail image", curr.image_url.url);
              // low detail images are 85 characters long
              return accum + "how many tokens are 85 characters long wow i didnt realize it would be this many okay";
            }
            // TODO diff details
            // https://platform.openai.com/docs/guides/vision/calculating-costs
            else if (curr.image_url.detail === "high") {
              return accum;
            } else if (curr.image_url.detail === "auto" || !curr.image_url.detail) {
              return accum;
            }
            return accum;
          }
          return accum;
        }, "");

        return accum + allStrings;
      },
      assistant: (accum, curr: OpenAI.ChatCompletionAssistantMessageParam) => accum + (curr.content || ""),
      tool: (accum, curr: OpenAI.ChatCompletionToolMessageParam) => accum + curr.content,
      function: (accum, curr: OpenAI.ChatCompletionFunctionMessageParam) => accum + (curr.content || ""),
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
