import { Prisma } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import * as dayjs from "dayjs";

import { DatabaseService } from "../../database";
import { DateSelection } from "./analytics.enum";
import {
  CostHistory,
  DashboardAnalytics,
  GetCostHistoryParams,
  GetDashboardAnalyticsParams,
} from "./analytics.types";

@Injectable()
export class AnalyticsService {
  constructor(private db: DatabaseService) {}

  async getCostHistory({ envId, dateSelection }: GetCostHistoryParams): Promise<CostHistory[]> {
    const now = dayjs();

    const startTimeMap = new Map<DateSelection, dayjs.Dayjs>([
      [DateSelection.ThirtyMinutes, now.subtract(30, "minute")],
      [DateSelection.OneHour, now.subtract(1, "hour")],
      [DateSelection.OneDay, now.subtract(1, "day")],
      [DateSelection.OneWeek, now.subtract(1, "week")],
      [DateSelection.OneMonth, now.subtract(1, "month")],
      [DateSelection.ThreeMonths, now.subtract(3, "month")],
      [DateSelection.AllTime, now.subtract(5, "year")],
    ]);

    const intervalMap = new Map<DateSelection, string>([
      [DateSelection.ThirtyMinutes, "minute"],
      [DateSelection.OneHour, "minute"],
      [DateSelection.OneDay, "hour"],
      [DateSelection.OneWeek, "day"],
      [DateSelection.OneMonth, "day"],
      [DateSelection.ThreeMonths, "week"],
      [DateSelection.AllTime, "month"],
    ]);

    // Get the start time and interval based on the dateSelection
    const startTime = startTimeMap.get(dateSelection)?.toISOString();
    const interval = intervalMap.get(dateSelection);

    if (!startTime || !interval) {
      throw new Error("Invalid date selection");
    }

    // Construct the query using string concatenation for the interval
    const queryString = `
        SELECT DATE_TRUNC('${interval}', start_time) AS "intervalStart",
               SUM(total_cost)::numeric    AS "totalCost"
        FROM "log"
        WHERE env_id = $1
          AND start_time >= $2::timestamp
        GROUP BY "intervalStart"
        ORDER BY "intervalStart";
    `;

    // Execute the query
    return this.db.$queryRawUnsafe<CostHistory[]>(queryString, envId, startTime);
  }

  async getDashboardAnalytics({
    envId,
    dateSelection,
  }: GetDashboardAnalyticsParams): Promise<DashboardAnalytics> {
    const now = dayjs();

    const dateSelectionMap: Record<DateSelection, Prisma.DateTimeFilter<"Log">> = {
      [DateSelection.ThirtyMinutes]: {
        gte: now.subtract(30, "minute").toISOString(),
      },
      [DateSelection.OneHour]: {
        gte: now.subtract(1, "hour").toISOString(),
      },
      [DateSelection.OneDay]: {
        gte: now.subtract(1, "day").toISOString(),
      },
      [DateSelection.OneWeek]: {
        gte: now.subtract(7, "day").toISOString(),
      },
      [DateSelection.OneMonth]: {
        gte: now.subtract(1, "month").toISOString(),
      },
      [DateSelection.ThreeMonths]: {
        gte: now.subtract(3, "month").toISOString(),
      },
      [DateSelection.AllTime]: {},
    };

    const prevDateSelectionMap: Record<DateSelection, Prisma.DateTimeFilter<"Log">> = {
      [DateSelection.ThirtyMinutes]: {
        gte: now.subtract(60, "minute").toISOString(),
        lt: now.subtract(30, "minute").toISOString(),
      },
      [DateSelection.OneHour]: {
        gte: now.subtract(2, "hour").toISOString(),
        lt: now.subtract(1, "hour").toISOString(),
      },
      [DateSelection.OneDay]: {
        gte: now.subtract(2, "day").toISOString(),
        lt: now.subtract(1, "day").toISOString(),
      },
      [DateSelection.OneWeek]: {
        gte: now.subtract(14, "day").toISOString(),
        lt: now.subtract(7, "day").toISOString(),
      },
      [DateSelection.OneMonth]: {
        gte: now.subtract(2, "month").toISOString(),
        lt: now.subtract(1, "month").toISOString(),
      },
      [DateSelection.ThreeMonths]: {
        gte: now.subtract(6, "month").toISOString(),
        lt: now.subtract(3, "month").toISOString(),
      },
      [DateSelection.AllTime]: {},
    };

    const baseAggregation: Prisma.LogAggregateArgs = {
      _avg: {
        duration: true,
      },
      _sum: {
        totalCost: true,
      },
      _count: true,
    };

    const currAggregationPromise = this.db.log.aggregate({
      where: {
        envId,
        startTime: dateSelectionMap[dateSelection],
      },
      ...baseAggregation,
    });

    const prevAggregationPromise = this.db.log.aggregate({
      where: {
        envId,
        startTime: prevDateSelectionMap[dateSelection],
      },
      ...baseAggregation,
    });

    const [currAggregation, prevAggregation] = await Promise.all([
      currAggregationPromise,
      prevAggregationPromise,
    ]);

    const currTotalCost = currAggregation._sum?.totalCost ?? 0;
    const prevTotalCost = prevAggregation._sum?.totalCost ?? 0;
    const currAvgDuration = currAggregation._avg?.duration ?? 0;
    const prevAvgDuration = prevAggregation._avg?.duration ?? 0;
    const currLogCount = (currAggregation._count as number) ?? 0;
    const prevLogCount = (prevAggregation._count as number) ?? 0;

    return {
      cost: currTotalCost.toString(),
      costChange: this.calculateChange(currTotalCost, prevTotalCost),
      averageLatency: currAvgDuration.toFixed(2),
      averageLatencyChange: this.calculateChange(currAvgDuration, prevAvgDuration),
      logCount: currLogCount.toString(),
      logCountChange: this.calculateChange(currLogCount, prevLogCount),
    };
  }

  private calculateChange(current: number, previous: number): string {
    if (current === 0 || previous === 0) {
      return "";
    }
    const change = ((current - previous) / previous) * 100;
    return `${change.toFixed(2)}%`;
  }
}
