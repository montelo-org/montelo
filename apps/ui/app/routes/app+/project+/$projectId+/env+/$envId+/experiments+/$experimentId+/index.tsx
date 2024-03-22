import { FullExperimentDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { ExperimentIdPage } from "~/pages/experiments/ExperimentId/ExperimentIdPage";

type LoaderType = {
  fullExperiment: FullExperimentDto;
};

export const loader: LoaderFunction = withAuth(async ({ api, params }) => {
  const experimentId = params.experimentId!;
  const fullExperiment = await api.experiment.experimentControllerGetFullExperiment({
    experimentId,
  });
  return json<LoaderType>({ fullExperiment });
});

export default function ExperimentIdRoute() {
  const { fullExperiment } = useLoaderData<LoaderType>();
  return <ExperimentIdPage fullExperiment={fullExperiment} />;
}
