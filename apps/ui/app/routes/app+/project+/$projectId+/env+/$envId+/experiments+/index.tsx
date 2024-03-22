import { ExperimentDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { ExperimentsPage } from "~/pages/experiments/ExperimentsPage";

type LoaderType = {
  experiments: ExperimentDto[];
};

export const loader: LoaderFunction = withAuth(async ({ api, params }) => {
  const envId = params.envId!;
  const experiments = await api.experiment.experimentControllerGetExperimentsForEnvironment({
    envId,
  });
  return json<LoaderType>({ experiments });
});

export default function ExperimentsRoute() {
  const { experiments } = useLoaderData<LoaderType>();
  return <ExperimentsPage experiments={experiments} />;
}
