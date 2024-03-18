import { DatasetDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { DatasetsPage } from "~/pages/datasets/DatasetsPage";


type LoaderType = {
  datasets: DatasetDto[];
};

export const loader: LoaderFunction = withAuth(async ({ api, params }) => {
  const envId = params.envId!;
  const datasets = await api.dataset.datasetControllerGetAllDatasets({
    envId,
  });
  return json<LoaderType>({ datasets });
});

export default function DatasetsRoute() {
  const { datasets } = useLoaderData<LoaderType>();
  return <DatasetsPage datasets={datasets} />;
}
