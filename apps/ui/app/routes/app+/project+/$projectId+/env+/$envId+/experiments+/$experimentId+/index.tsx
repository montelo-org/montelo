import { ExperimentWithDatapointRunsDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { withAuth } from "~/auth/withAuth";
import { ExperimentIdPage } from "~/pages/experiments/ExperimentId/ExperimentIdPage";


type LoaderType = {
  experiment: ExperimentWithDatapointRunsDto;
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

  const { experiment, totalDatapointRuns } =
    await api.experiment.experimentControllerGetPaginatedExperimentWithDatapointRuns({
      experimentId,
      take: pageSize.toString(),
      skip: skipAmount.toString(),
    });
  
  const formattedRuns = experiment.datapointRuns.map((run) => ({
    ...run,
    createdAt: dayjs(run.createdAt).format("h:mm:ss a")
  }));
  const formattedExperiment = {
    ...experiment,
    datapointRuns: formattedRuns
  };

  const totalPages = Math.ceil(totalDatapointRuns / pageSize);
  return json<LoaderType>({ experiment: formattedExperiment, totalDatapointRuns, currentPage: page, totalPages });
});

export default function ExperimentIdRoute() {
  const { experiment, totalDatapointRuns, currentPage, totalPages } = useLoaderData<LoaderType>();
  return (
    <ExperimentIdPage
      experiment={experiment}
      totalDatapointRuns={totalDatapointRuns}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
