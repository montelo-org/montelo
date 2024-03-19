import { DatasetDto } from "@montelo/browser-client";
import { FC } from "react";
import { PageBreadcrumbContainer } from "~/components/PageBreadcrumbContainer";
import { BreadcrumbPage } from "~/components/ui/breadcrumb";
import { CreateDatasetDialog } from "~/pages/datasets/CreateDatasetDialog";
import { DatasetCard } from "./DatasetCard";

export const DatasetsPage: FC<{ datasets: DatasetDto[] }> = ({ datasets }) => {
  return (
    <div className={"mt-2 flex flex-col"}>
      <PageBreadcrumbContainer>
        <BreadcrumbPage>Datasets</BreadcrumbPage>
      </PageBreadcrumbContainer>

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
