import { TraceWithLogsDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { TraceIdPage } from "~/pages/dashboard/TraceIdPage";

type LoaderType = {
  trace: TraceWithLogsDto;
};

export const loader: LoaderFunction = withAuth(async ({ api, params }) => {
  const traceId = params.traceId!;
  const trace = await api.trace().traceControllerGetAll({
    traceId,
  });
  return json<LoaderType>({ trace });
});

export default function TraceIdRoute() {
  const { trace } = useLoaderData<LoaderType>();
  return <TraceIdPage trace={trace} />;
}
