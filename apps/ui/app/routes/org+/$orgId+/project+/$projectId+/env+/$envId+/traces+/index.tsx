import { LogDto } from "@montelo/browser-client";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "../../../../../../../../common/auth/withAuth";
import { LogTable } from "../../../../../../../../components/tables/LogTable/LogTable";
import { Routes } from "../../../../../../../../routes";

type LoaderType = {
  logs: LogDto[];
  orgId: string;
}

export const loader: LoaderFunction = withAuth(async ({ api, params, orgId }) => {
  if (!orgId) {
    return redirect(Routes.app.root);
  }

  const envId = params.envId!;

  const logs = await api.log().logControllerGetAll({
    envId,
  });

  return json<LoaderType>({ logs, orgId });
});

export default function TracesPage() {
  const { logs, orgId } = useLoaderData<LoaderType>();
  const logsWithOrgId = logs.map((log) => ({ ...log, orgId }));
  return <LogTable logs={logsWithOrgId} />;
};
