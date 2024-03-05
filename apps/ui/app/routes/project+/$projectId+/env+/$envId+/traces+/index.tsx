import { LogDto, LogsDto } from "@montelo/browser-client";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "../../../../../../common/auth/withAuth";
import { LogTable } from "../../../../../../components/tables/LogTable/LogTable";

type LoaderType = {
  logs: LogDto[];
  // lastTimestamp: string | null;
  currentPage: number;
  totalPages: number;
}

export const loader: LoaderFunction = withAuth(async ({ api, user, params, request }) => {
  const envId = params.envId!;

  const { searchParams } = new URL(request.url);
  // const lastTimestamp = searchParams.get('lastTimestamp'); 
  const page = searchParams.get('page') || "1"; 

  const pageSize = 1;
  const skipAmount = page ? parseInt(page) - 1 : 0;

  const response = await api.log().logControllerGetAll({
    envId,
    take: pageSize.toString(),
    skip: skipAmount.toString(),
    // ...(lastTimestamp && { lastTimestamp, skip: "1" }),
  });

  const { logs, totalCount } = response || { logs: [], totalCount: 0 };
  // const newLastTimestamp = logs.length > 0 ? logs[logs.length - 1].startTime : null;

   return json<LoaderType>({
      logs,
      currentPage: parseInt(page),
      totalPages: totalCount ? Math.ceil(totalCount / pageSize) : 0,
      // lastTimestamp: newLastTimestamp,
   });
});

export default function TracesPage() {
  const { logs, currentPage, totalPages } = useLoaderData<LoaderType>();
  return <LogTable logs={logs} currentPage={currentPage} totalPages={totalPages} />;
};
