import { LogDto } from "@montelo/browser-client";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Routes } from "../../../../../../routes";
import { withAuth } from "../../../../../../common/auth/withAuth";
import { LogTable } from "../../../../../../components/tables/LogTable/LogTable";

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

  const pageSize = 1;
  const skipAmount = page ? parseInt(page) - 1 : 0;

  const response = await api.log().logControllerGetAll({
    envId,
    take: pageSize.toString(),
    skip: skipAmount.toString(),
  });

  const { logs, totalCount } = response || { logs: [], totalCount: 0 };

  return json<LoaderType>({
    logs,
    orgId,
    currentPage: parseInt(page),
    totalPages: totalCount ? Math.ceil(totalCount / pageSize) : 0,
  });
});

export default function TracesPage() {
  const { logs, currentPage, totalPages, orgId } = useLoaderData<LoaderType>();
  const logsWithOrgId = logs.map((log) => ({ ...log, orgId }));
  return <LogTable logs={logsWithOrgId} currentPage={currentPage} totalPages={totalPages} />;
};
