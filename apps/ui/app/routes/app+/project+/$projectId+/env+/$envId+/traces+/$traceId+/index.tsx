import { TraceWithLogsDto } from "@montelo/browser-client";
import { json, LoaderFunction } from "@remix-run/node";
import { ShouldRevalidateFunction, useLoaderData } from "@remix-run/react";
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

// no need to revalidate, as the trace doesn't change and all the logs are already loaded
export const shouldRevalidate: ShouldRevalidateFunction = () => false;

export default function TraceIdRoute() {
  const { trace } = useLoaderData<LoaderType>();
  return <TraceIdPage trace={trace} />;
}
