import { ExperimentDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { ExperimentsPage } from "~/pages/experiments/ExperimentsPage";

type LoaderType = {
  experiments: ExperimentDto[];
  totalCount: number;
  currentPage: number;
};

export const loader: LoaderFunction = withAuth(async ({ request, api, params }) => {
  const envId = params.envId!;

  const { searchParams } = new URL(request.url);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = 20;
  const skipAmount = (currentPage - 1) * pageSize;

  const { experiments, totalCount } = await api.experiment.experimentControllerGetPaginatedExperimentsForEnvironment({
    envId,
    take: pageSize.toString(),
    skip: skipAmount.toString(),
  });
  return json<LoaderType>({ experiments, totalCount, currentPage });
});

export default function ExperimentsRoute() {
  const { experiments, totalCount, currentPage } = useLoaderData<LoaderType>();
  return <ExperimentsPage experiments={experiments} totalCount={totalCount} currentPage={currentPage} />;
}
