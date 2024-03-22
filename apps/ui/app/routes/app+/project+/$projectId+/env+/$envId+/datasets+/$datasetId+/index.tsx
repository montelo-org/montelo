import { FullDatasetDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { DatasetIdPage } from "~/pages/datasets/dataset/DatasetIdPage";

type LoaderType = {
  dataset: FullDatasetDto;
  currentPage: number;
  totalPages: number;
};

export const loader: LoaderFunction = withAuth(async ({ api, params, request }) => {
  const datasetId = params.datasetId!;

  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const pageSize = 20;
  const skipAmount = page ? parseInt(page) - 1 : 0;

  const { dataset, totalCount } = await api.dataset.datasetControllerGetDatasetWithDatapoints({
    datasetId,
    take: pageSize.toString(),
    skip: skipAmount.toString(),
  });

  console.log(dataset);

  return json<LoaderType>({
    dataset,
    currentPage: parseInt(page),
    totalPages: totalCount ? Math.ceil(totalCount / pageSize) : 0,
  });
});

export default function DatasetIdRoute() {
  const { dataset, currentPage, totalPages } = useLoaderData<LoaderType>();
  return <DatasetIdPage dataset={dataset} currentPage={currentPage} totalPages={totalPages} />;
}
