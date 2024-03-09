import { CostHistoryDto, DashboardAnalyticsDto, LogDto } from "@montelo/browser-client";
import { TypedDeferredData } from "@remix-run/node";

export type DeferredDashboardLoader = {
  analytics: Promise<DashboardAnalyticsDto>;
  logs: LogDto[];
  costHistory: Promise<CostHistoryDto>;
};

export type DashboardLoader = () => Promise<TypedDeferredData<DeferredDashboardLoader>>;
