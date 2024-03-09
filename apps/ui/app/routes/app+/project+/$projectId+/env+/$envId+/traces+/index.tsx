import { LogDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { TracesPage } from "~/pages/traces";

type LoaderType = {
  logs: LogDto[];
  orgId: string;
  currentPage: number;
  totalPages: number;
};

export const loader: LoaderFunction = withAuth(async ({ request, api, params, orgId }) => {
  const envId = params.envId!;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const sortColumn = searchParams.get("sortColumn");
  const sortDirection = searchParams.get("sortDirection");

  const pageSize = 20;
  const skipAmount = page ? parseInt(page) - 1 : 0;

  const sColumn = sortColumn && sortColumn !== "undefined" ? sortColumn : undefined;
  const sDirection = sortDirection && sortDirection !== "undefined" ? sortDirection : undefined
  console.log(`making request with sColumn and sDirection: ${sColumn} ${sDirection}`);
  const response = await api.log().logControllerGetAll({
    envId,
    take: pageSize.toString(),
    skip: skipAmount.toString(),
    sortColumn: sColumn,
    sortDirection: sDirection,
  });
  const { logs, totalCount } = response;

  return json<LoaderType>({
    logs,
    orgId,
    currentPage: parseInt(page),
    totalPages: totalCount ? Math.ceil(totalCount / pageSize) : 0,
  });
});

export default function TracesRoute() {
  const { logs, currentPage, totalPages, orgId } = useLoaderData<LoaderType>();
  const logsWithOrgId = logs.map((log) => ({ ...log, orgId }));
  return <TracesPage logs={logsWithOrgId} currentPage={currentPage} totalPages={totalPages} />;
}
