import { LogDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { TracesPage } from "~/pages/traces";
import { TimeFrames } from "~/pages/traces/constants/timeframes";

const formatDate = (date?: TimeFrames) => {
  const NOW = new Date().getTime();
  const MINUTE = 60 * 1000;
  const DAY = 24 * 60 * MINUTE;

  switch (date) {
    case TimeFrames.LAST_15_MINUTES:
      return new Date(NOW - 15 * MINUTE).toISOString();
    case TimeFrames.LAST_30_MINUTES:
      return new Date(NOW - 30 * MINUTE).toISOString();
    case TimeFrames.LAST_HOUR:
      return new Date(NOW - 60 * MINUTE).toISOString();
    case TimeFrames.LAST_DAY:
      return new Date(NOW - DAY).toISOString();
    case TimeFrames.LAST_3_DAYS:
      return new Date(NOW - 3 * DAY).toISOString();
    case TimeFrames.LAST_7_DAYS:
      return new Date(NOW - 7 * DAY).toISOString();
    case TimeFrames.LAST_30_DAYS:
      return new Date(NOW - 30 * DAY).toISOString();
    case TimeFrames.ALL_TIME:
    default:
      return null;
  }
};

type LoaderType = {
  logs: LogDto[];
  currentPage: number;
  totalPages: number;
};

export const loader: LoaderFunction = withAuth(async ({ request, api, params }) => {
  const envId = params.envId!;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const sortColumn = searchParams.get("sortColumn");
  const sortDirection = searchParams.get("sortDirection");
  const searchQuery = searchParams.get("q");
  const startDate = formatDate(searchParams.get("date") as TimeFrames | undefined);

  const pageSize = 20;
  const skipAmount = page ? parseInt(page) - 1 : 0;

  const response = await api.log.logControllerGetAll({
    envId,
    take: pageSize.toString(),
    skip: skipAmount.toString(),
    sortColumn: sortColumn && sortColumn !== "undefined" ? sortColumn : undefined,
    sortDirection: sortDirection && sortDirection !== "undefined" ? sortDirection : undefined,
    searchQuery: searchQuery && searchQuery !== "undefined" ? searchQuery : undefined,
    startDate: startDate ? startDate : undefined,
  });
  const { logs, totalCount } = response;

  return json<LoaderType>({
    logs,
    currentPage: parseInt(page),
    totalPages: totalCount ? Math.ceil(totalCount / pageSize) : 0,
  });
});

export default function TracesRoute() {
  const { logs, currentPage, totalPages } = useLoaderData<LoaderType>();
  return <TracesPage logs={logs} currentPage={currentPage} totalPages={totalPages} />;
}
