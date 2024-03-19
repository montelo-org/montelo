import { FullDatasetDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { DatasetIdPage } from "~/pages/datasets/dataset/DatasetIdPage";

type LoaderType = {
  dataset: FullDatasetDto;
};

export const loader: LoaderFunction = withAuth(async ({ api, params }) => {
  const datasetId = params.datasetId!;
  const dataset = await api.dataset.datasetControllerGetFullDataset({
    datasetId,
  });
  return json<LoaderType>({ dataset });
});

export default function DatasetIdRoute() {
  const { dataset } = useLoaderData<LoaderType>();
  return <DatasetIdPage dataset={dataset} />;
}
