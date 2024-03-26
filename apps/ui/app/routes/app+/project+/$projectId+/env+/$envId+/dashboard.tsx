import { AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum } from "@montelo/browser-client";
import { defer } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { withAuth } from "~/auth/withAuth";
import { DashboardPage } from "~/pages/dashboard/DashboardPage";
import { DashboardLoader, DeferredDashboardLoader } from "~/types/DashboardLoader.types";

export const loader = withAuth(async ({ request, api, params }) => {
  const envId = params.envId!;
  const { searchParams } = new URL(request.url);
  const dateSelectionQuery = (searchParams.get("dateSelection") ||
    AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._30Mins) as AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum;
  const analyticsPromise = api.analytics.analyticsControllerGetAnalyticsForEnv({
    envId,
    dateSelection: dateSelectionQuery,
  });
  const costHistoryPromise = api.analytics.analyticsControllerGetCostHistoryForEnv({
    envId,
    dateSelection: dateSelectionQuery,
  });
  const logs = await api.log.logControllerGetLogsForEnvironment({
    envId,
    take: "25",
  });
  return defer<DeferredDashboardLoader>({
    analytics: analyticsPromise,
    logs: logs.logs,
    costHistory: costHistoryPromise,
  });
});

export default function DashboardRoute() {
  const { analytics, logs, costHistory } = useLoaderData<DashboardLoader>();

  const formattedLogs = logs.map((log) => {
    return {
      ...log,
      createdAt: dayjs(log.createdAt).format("h:mm:ssa"),
      startTime: dayjs(log.startTime).format("h:mm:ssa"),
    };
  });

  return <DashboardPage analytics={analytics} logs={formattedLogs} costHistory={costHistory} />;
}
