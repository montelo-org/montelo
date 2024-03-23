import { ExperimentDto, FullDatasetDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { DatasetIdPage } from "~/pages/datasets/dataset/DatasetIdPage";

type LoaderType = {
  dataset: FullDatasetDto;
  currentPage: number;
  totalPages: number;
  experiments: ExperimentDto[];
};

export const loader: LoaderFunction = withAuth(async ({ api, params, request }) => {
  const datasetId = params.datasetId!;

  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const pageSize = 20;
  const skipAmount = page ? parseInt(page) - 1 : 0;

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
    currentPage: parseInt(page),
    totalPages: totalCount ? Math.ceil(totalCount / pageSize) : 0,
    experiments,
  });
});

export default function DatasetIdRoute() {
  const { dataset, currentPage, totalPages, experiments } = useLoaderData<LoaderType>();
  return <DatasetIdPage dataset={dataset} currentPage={currentPage} totalPages={totalPages} experiments={experiments} />;
}
