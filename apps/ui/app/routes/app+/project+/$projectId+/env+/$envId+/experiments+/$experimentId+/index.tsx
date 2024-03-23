import { FullExperimentDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { ExperimentIdPage } from "~/pages/experiments/ExperimentId/ExperimentIdPage";

type LoaderType = {
  fullExperiment: FullExperimentDto;
  totalDatapointRuns: number;
  currentPage: number;
  totalPages: number;
};

export const loader: LoaderFunction = withAuth(async ({ request, api, params }) => {
  const experimentId = params.experimentId!;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 20;
  const skipAmount = (page - 1) * pageSize;

  const { experiment, totalDatapointRuns } = await api.experiment.experimentControllerGetPaginatedFullExperiment({
    experimentId,
    take: pageSize.toString(),
    skip: skipAmount.toString(),
  });

  const totalPages = Math.ceil(totalDatapointRuns / pageSize);
  return json<LoaderType>({ fullExperiment: experiment, totalDatapointRuns, currentPage: page, totalPages });
});

export default function ExperimentIdRoute() {
  const { fullExperiment, totalDatapointRuns, currentPage, totalPages } = useLoaderData<LoaderType>();
  return (
    <ExperimentIdPage
      fullExperiment={fullExperiment}
      totalDatapointRuns={totalDatapointRuns}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
