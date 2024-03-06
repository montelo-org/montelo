import { AnalyticsControllerGetForDashboardDateSelectionEnum } from "@montelo/browser-client";
import { defer } from "@remix-run/node";
import { withAuth } from "~/auth/withAuth";
import { DeferredDashboardLoader } from "~/types/DashboardLoader.types";
import { DashboardPage } from "~/pages/dashboard/DashboardPage";

export const loader = withAuth(async ({ request, api, params, orgId }) => {
  const envId = params.envId!;
  const { searchParams } = new URL(request.url);
  const dateSelectionQuery = (searchParams.get("dateSelection") || AnalyticsControllerGetForDashboardDateSelectionEnum._30Mins) as AnalyticsControllerGetForDashboardDateSelectionEnum;

  const analyticsPromise = api.analytics().analyticsControllerGetForDashboard({
    envId,
    dateSelection: dateSelectionQuery,
  });

  const costHistoryPromise = api.analytics().analyticsControllerGetCostHistory({
    envId,
    dateSelection: dateSelectionQuery,
  });

  const logs = await api.log().logControllerGetAll({
    envId,
    take: "25",
  });

  return defer<DeferredDashboardLoader>({
    analytics: analyticsPromise,
    logs: logs.logs,
    costHistory: costHistoryPromise,
    orgId,
  });
});

export default function DashboardRoute() {
  return <DashboardPage />;
}
