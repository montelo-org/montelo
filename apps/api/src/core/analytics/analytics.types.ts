import { DateSelection } from "./analytics.enum";

export type GetCostHistoryParams = {
  envId: string;
  dateSelection: DateSelection;
};

export type CostHistory = {
  intervalStart: string;
  totalCost: number;
};

export type GetDashboardAnalyticsParams = {
  envId: string;
  dateSelection: DateSelection;
};

export type DashboardAnalytics = {
  cost: string;
  averageLatency: string;
  traces: string;
  max: {
    cost: string;
    latency: string;
  },
  changes: {
    cost: string;
    latency: string;
    traces: string;
  };
};
