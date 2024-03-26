import { LogDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { withAuth } from "~/auth/withAuth";
import { TracesPage } from "~/pages/traces";


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

  const pageSize = 20;
  const skipAmount = (page - 1) * pageSize;

  const response = await api.log.logControllerGetLogsForEnvironment({
    envId,
    take: pageSize.toString(),
    skip: skipAmount.toString(),
    sortColumn: sortColumn && sortColumn !== "undefined" ? sortColumn : undefined,
    sortDirection: sortDirection && sortDirection !== "undefined" ? sortDirection : undefined,
    searchQuery: searchQuery && searchQuery !== "undefined" ? searchQuery : undefined,
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

  const formattedLogs = logs.map((log) => {
    return {
      ...log,
      createdAt: dayjs(log.createdAt).format("h:mm:ssa - D/M/YY"),
      startTime: dayjs(log.startTime).format("h:mm:ssa - D/M/YY"),
    };
  });
  
  return <TracesPage logs={formattedLogs} currentPage={currentPage} totalPages={totalPages} />;
}
