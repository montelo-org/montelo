import { DatapointRunWithExperimentDto, TraceWithLogsDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { DatasetRunIdPage } from "~/pages/datasetRuns/DatasetRunIdPage";

type LoaderType = {
  trace: TraceWithLogsDto | null;
  datapointRun: DatapointRunWithExperimentDto | null;
};

export const loader: LoaderFunction = withAuth(async ({ api, params, request }) => {
  const datapointRunId = params.datapointRunId!;

  const datapointRunPromise = api.datapointRun.datapointRunControllerGetDatapointWithExperiment({
    datapointRunId,
  });

  const tracePromise = api.datapointRun.datapointRunControllerGetDatapointTrace({
    datapointRunId,
  });

  const [datapointRunRes, traceRes] = await Promise.allSettled([datapointRunPromise, tracePromise]);

  const trace = traceRes.status === "fulfilled" ? traceRes.value : null;
  const datapointRun = datapointRunRes.status === "fulfilled" ? datapointRunRes.value : null;

  return json<LoaderType>({ trace, datapointRun });
});

export default function DatapointIdRoute() {
  const { trace, datapointRun } = useLoaderData<LoaderType>();
  return <DatasetRunIdPage trace={trace} datapointRun={datapointRun} />;
}
