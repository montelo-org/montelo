import { ExperimentDto, FullDatasetDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { withAuth } from "~/auth/withAuth";
import { DatasetIdPage } from "~/pages/datasets/dataset/DatasetIdPage";

type LoaderType = {
  dataset: FullDatasetDto;
  currentPage: number;
  totalPages: number;
  experiments: ExperimentDto[];
  totalCount: number;
};

export const loader: LoaderFunction = withAuth(async ({ api, params, request }) => {
  const datasetId = params.datasetId!;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 5;
  const skipAmount = (page - 1) * pageSize;

  const datasetPromise = api.dataset.datasetControllerGetDatasetWithDatapoints({
    datasetId,
    take: pageSize.toString(),
    skip: skipAmount.toString(),
  });

  const experimentsPromise = api.dataset.datasetControllerGetDatasetRecentExperiments({
    datasetId,
  });

  const [datasetRes, experiments] = await Promise.all([datasetPromise, experimentsPromise]);
  const { dataset, totalCount } = datasetRes;

  return json<LoaderType>({
    dataset,
    currentPage: page,
    totalPages: totalCount ? Math.ceil(totalCount / pageSize) : 0,
    experiments,
    totalCount,
  });
});

export default function DatasetIdRoute() {
  const { dataset, currentPage, totalPages, experiments, totalCount } = useLoaderData<LoaderType>();

  const formattedExperiments = experiments.map((experiment) => ({
    ...experiment,
    createdAt: dayjs(experiment.createdAt).format("MMM D YY / h:mm:ss a"),
  }));

  return (
    <DatasetIdPage
      dataset={dataset}
      currentPage={currentPage}
      totalPages={totalPages}
      experiments={formattedExperiments}
      totalCount={totalCount}
    />
  );
}
