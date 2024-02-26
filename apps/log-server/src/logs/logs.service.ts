import { Prisma } from "@montelo/db";
import { Injectable, Logger } from "@nestjs/common";
import { pick } from "lodash";

import { CostulatorService } from "../costulator/costulator.service";
import { LogCostInput } from "../costulator/llm-provider.interface";
import { NullableCost, TraceMetrics } from "../costulator/types";
import { DatabaseService } from "../database";
import { LogInput, TraceInput } from "./dto/create-log.input";
import { TraceWithLogs } from "./types";


@Injectable()
export class LogsService {
  private logger = new Logger(LogsService.name);

  constructor(
    private db: DatabaseService,
    private costulatorService: CostulatorService,
  ) {}

  async create(envId: string, log: LogInput, trace?: TraceInput): Promise<void> {
    // get the existing trace from the db if it exists
    const dbTrace = trace?.id
      ? await this.db.trace.findUnique({
          where: {
            id: trace.id,
          },
          include: {
            logs: true,
          },
        })
      : null;

    // get the cost of the individual log
    // you need the arrow function to preserve the class binding
    const logCost = this.calculateLogCostOrDefault(log, (params: LogCostInput) =>
      this.costulatorService.getLogCost(params),
    );

    // get the updated cost of the trace + this new log. to do this we check all traces already on
    // the trace, sum the metrics up, then add the current log to it,
    const traceMetrics = await this.calculateTraceMetricsOrDefault({
      dbTrace,
      logCost,
      logTokens: pick(log, ["inputTokens", "outputTokens", "totalTokens"]),
    });

    // get the parent id
    const parentLogId = this.getParentId(log.name, dbTrace);
    const logNameWithoutPath = this.getLogNameWithoutPath(log.name, dbTrace);

    // define the base TRACE
    const traceDates = this.getTraceDates(dbTrace, log);
    const baseCreateTrace: Prisma.TraceCreateWithoutLogsInput = {
      ...traceMetrics,
      ...traceDates,
      envId,
      id: trace?.id,
      name: trace?.name || "",
    };

    const traceArg: Prisma.TraceCreateNestedOneWithoutLogsInput = trace
      ? {
          connectOrCreate: {
            where: {
              id: trace.id,
            },
            create: baseCreateTrace,
          },
        }
      : {
          create: baseCreateTrace,
        };

    // define the LOG create
    const logCreateInput: Prisma.LogCreateInput = {
      ...log,
      ...logCost,
      name: logNameWithoutPath,
      parentLogId,
      trace: traceArg,
      environment: {
        connect: {
          id: envId,
        },
      },
    };

    const createdLog = await this.db.log.create({
      data: logCreateInput,
    });
    this.logger.log(`Created log with id ${createdLog.id}`);

    // update the trace metrics after we create the log
    await this.db.trace.update({
      where: {
        id: createdLog.traceId,
      },
      data: { ...traceMetrics, ...traceDates },
    });
    this.logger.log(`Updated trace with id ${createdLog.traceId}`);
  }

  private async calculateTraceMetricsOrDefault({
    dbTrace,
    logCost,
    logTokens,
  }: {
    dbTrace: TraceWithLogs | null;
    logCost: NullableCost;
    logTokens: { inputTokens?: number; outputTokens?: number; totalTokens?: number };
  }): Promise<TraceMetrics> {
    // default trace metrics
    if (!dbTrace) {
      return {
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        inputCost: 0,
        outputCost: 0,
        totalCost: 0,
      };
    }

    const traceMetrics = this.costulatorService.getTraceMetrics(dbTrace);

    function truncateToSignificantDigits(num: number, significantDigits: number): number {
      // Convert to string using toPrecision which keeps significant digits
      const numString = num.toPrecision(significantDigits);

      // Convert back to number to remove trailing zeros
      const truncatedNum = Number(numString);

      // Handle the edge case where toPrecision might round up the number,
      // which could add an extra digit making it not equal to the original number.
      // If that happens, remove the last digit.
      if (truncatedNum.toString().length > num.toString().length) {
        return parseFloat(truncatedNum.toString().slice(0, -1));
      }

      return truncatedNum;
    }

    return {
      inputTokens: traceMetrics.inputTokens + (logTokens.inputTokens || 0),
      outputTokens: traceMetrics.outputTokens + (logTokens.outputTokens || 0),
      totalTokens: traceMetrics.totalTokens + (logTokens.totalTokens || 0),
      inputCost: truncateToSignificantDigits(traceMetrics.inputCost + (logCost.inputCost || 0), 5),
      outputCost: truncateToSignificantDigits(
        traceMetrics.outputCost + (logCost.outputCost || 0),
        5,
      ),
      totalCost: truncateToSignificantDigits(traceMetrics.totalCost + (logCost.totalCost || 0), 5),
    };
  }

  private calculateLogCostOrDefault(
    log: LogInput,
    calculateCost: (params: LogCostInput) => NullableCost,
  ): NullableCost {
    if (log.model && log.inputTokens && log.outputTokens) {
      return calculateCost({
        model: log.model,
        inputTokens: log.inputTokens,
        outputTokens: log.outputTokens,
      });
    }
    return { inputCost: null, outputCost: null, totalCost: null };
  }

  private getParentId(logName: string, dbTrace: TraceWithLogs | null): string | null {
    if (!dbTrace) {
      return null;
    }

    const splitName = this.splitLogName(logName);
    if (splitName.length === 1) {
      return null;
    }

    const parentLogName = splitName.at(-2);
    const parentLog = dbTrace.logs.find((log) => log.name === parentLogName);
    if (!parentLog) {
      this.logger.log(`Parent log to ${logName} not found`);
      return null;
    }

    return parentLog.id;
  }

  private getTraceDates(
    trace: TraceWithLogs | null,
    log: LogInput,
  ): {
    startTime: string;
    endTime: string;
    duration: number;
  } {
    const now = new Date().toISOString();
    // If log.endTime is not provided, use the current time.
    const endTime = log.endTime || now;
    // If trace is not null, use its startTime; otherwise, use log.startTime or the current time.
    const startTime = trace?.startTime.toISOString() || log.startTime || now;

    // Ensure dates are in proper order for duration calculation (endTime - startTime).
    const durationMs = new Date(endTime).getTime() - new Date(startTime).getTime();
    // Round the duration to the nearest hundredth of a second.
    const duration = parseFloat((durationMs / 1000).toFixed(2));

    return {
      startTime,
      endTime,
      duration: Math.max(0, duration),
    };
  }

  private getLogNameWithoutPath(name: string, dbTrace: TraceWithLogs | null): string {
    // if not part of a trace, just return the name
    if (!dbTrace) {
      return name;
    }

    const splitName = this.splitLogName(name);
    return splitName.at(-1)!;
  }

  private splitLogName(name: string): string[] {
    return name
      .split("/")
      .filter((n) => n.length)
      .map((n) => n.trim());
  }
}
