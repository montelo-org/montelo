import { TraceWithLogsDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { withAuth } from "~/auth/withAuth";
import { useLoaderData } from "@remix-run/react";
import { TraceIdPage } from "~/pages/dashboard/TraceIdPage";

type LoaderType = {
  trace: TraceWithLogsDto;
};

export const loader: LoaderFunction = withAuth(async ({ api, params, request }) => {
  const datapointRunId = params.datapointRunId!;

  const trace = await api.datapointRun.datapointRunControllerGetDatapointTrace({
    datapointRunId,
  });

  return json<LoaderType>({ trace });
});

export default function DatapointIdRoute() {
  const { trace } = useLoaderData<LoaderType>();
  return <TraceIdPage trace={trace} />;
}
