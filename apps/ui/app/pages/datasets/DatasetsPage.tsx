import { DatasetDto } from "@montelo/browser-client";
import { FC } from "react";
import { CreateDatasetDialog } from "~/pages/datasets/CreateDatasetDialog";
import { DatasetCard } from "./DatasetCard";

export const DatasetsPage: FC<{ datasets: DatasetDto[] }> = ({ datasets }) => {
  return (
    <div className={"flex flex-col"}>
      <div className={"flex justify-end"}>
        <CreateDatasetDialog />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {datasets.map((dataset) => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </div>
    </div>
  );
};
