import { LogDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { TracesPage } from "~/pages/traces";
import { TimeFrames } from "~/pages/traces/constants/timeframes";
import { formatDate } from "~/utils/formatDate";

type LoaderType = {
  logs: LogDto[];
  currentPage: number;
  totalPages: number;
};

export const loader: LoaderFunction = withAuth(async ({ request, api, params }) => {
  const envId = params.envId!;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const sortColumn = searchParams.get("sortColumn");
  const sortDirection = searchParams.get("sortDirection");
  const searchQuery = searchParams.get("q");
  const startDate = formatDate(searchParams.get("date") as TimeFrames | undefined);

  const pageSize = 20;
  const skipAmount = (page - 1) * pageSize;

  const response = await api.log.logControllerGetLogsForEnvironment({
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
    currentPage: page,
    totalPages: totalCount ? Math.ceil(totalCount / pageSize) : 0,
  });
});

export default function TracesRoute() {
  const { logs, currentPage, totalPages } = useLoaderData<LoaderType>();
  return <TracesPage logs={logs} currentPage={currentPage} totalPages={totalPages} />;
}
