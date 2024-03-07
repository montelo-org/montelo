import { LogSources } from "@montelo/db";
import { Inject, Injectable, Logger } from "@nestjs/common";

import { TraceWithLogs } from "../logs/types";
import { LLMProvider, LogCostInput, LogCostOutput } from "./llm-provider.interface";
import { TraceMetrics } from "./types";

@Injectable()
export class CostulatorService {
  private logger = new Logger(CostulatorService.name);

  constructor(@Inject("LLM_PROVIDERS") private providers: LLMProvider[]) {}

  getProvider(source: LogSources): LLMProvider | undefined {
    if (source === LogSources.MANUAL) {
      return undefined;
    }
    const provider = this.providers.find((provider) => provider.source === source);
    if (!provider) {
      this.logger.warn(`No LLM provider found for source: ${source}`);
    }
    return provider;
  }

  getLogCost(provider: LLMProvider, params: LogCostInput): LogCostOutput {
    const result = provider.calculateLogCost(params);
    return {
      inputCost: this.roundToSmallestDecimal(result.inputCost),
      outputCost: this.roundToSmallestDecimal(result.outputCost),
      totalCost: this.roundToSmallestDecimal(result.totalCost),
    };
  }

  getTraceMetrics(trace: TraceWithLogs): TraceMetrics {
    return trace.logs.reduce(
      (accum, curr) => {
        return {
          inputTokens: accum.inputTokens + (curr.inputTokens || 0),
          outputTokens: accum.outputTokens + (curr.outputTokens || 0),
          totalTokens: accum.totalTokens + (curr.totalTokens || 0),
          inputCost: accum.inputCost + (curr.inputCost || 0),
          outputCost: accum.outputCost + (curr.outputCost || 0),
          totalCost: accum.totalCost + (curr.totalCost || 0),
        };
      },
      {
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        inputCost: 0,
        outputCost: 0,
        totalCost: 0,
      } as TraceMetrics,
    );
  }

  private roundToSmallestDecimal(num: number): number {
    if (num === 0) {
      return 0;
    }

    // Determine the smallest significant decimal place
    // Adjust precision based on the decimal place, without overly restricting it for small numbers
    const precision = Math.ceil(-Math.log10(num % 1)); // Remove the cap to ensure small numbers are handled correctly

    const roundedNum = parseFloat(num.toFixed(precision));

    // Additional check to avoid returning 0 for very small numbers
    return roundedNum === 0 && num !== 0 ? parseFloat(num.toPrecision(1)) : roundedNum;
  }
}
