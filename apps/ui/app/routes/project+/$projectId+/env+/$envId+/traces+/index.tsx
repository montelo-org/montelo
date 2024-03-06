import { LogDto } from "@montelo/browser-client";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Routes } from "~/routes";
import { withAuth } from "~/common/auth/withAuth";
import { TracesPage } from "~/pages/traces/TracesPage";

type LoaderType = {
  logs: LogDto[];
  orgId: string;
  currentPage: number;
  totalPages: number;
}

export const loader: LoaderFunction = withAuth(async ({ request, api, params, orgId }) => {
  if (!orgId) {
    return redirect(Routes.app.root);
  }
  
  const envId = params.envId!;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const sortColumn = searchParams.get("sortColumn");
  const sortDirection = searchParams.get("sortDirection");
  
  const pageSize = 20;
  const skipAmount = page ? parseInt(page) - 1 : 0;

  const response = await api.log().logControllerGetAll({
    envId,
    take: pageSize.toString(),
    skip: skipAmount.toString(),
    sortColumn: sortColumn && sortColumn !== "undefined" ? sortColumn : undefined,
    sortDirection: sortDirection && sortDirection !== "undefined" ? sortDirection : undefined,
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
};
