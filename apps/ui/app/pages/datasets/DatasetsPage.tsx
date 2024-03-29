import { DatasetDto } from "@montelo/browser-client";
import { FC, useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { CreateDatasetDialog } from "~/pages/datasets/CreateDatasetDialog";
import { PageDocLink } from "~/pages/layouts/PageDocLink";
import { PageSubtitle } from "~/pages/layouts/PageSubtitle";
import { LayoutBreadcrumb } from "~/pages/layouts/types";
import { Routes } from "~/routes";
import { PageLayout } from "../layouts/PageLayout";
import { DatasetCard } from "./DatasetCard";

export const DatasetsPage: FC<{ datasets: DatasetDto[] }> = ({ datasets }) => {
  const breadcrumbs: LayoutBreadcrumb[] = [
    {
      label: "Datasets",
    },
  ];

  const subtitle = () => {
    return (
      <PageSubtitle>
        Create datasets to validate your pipelines.{" "}
        <PageDocLink to={Routes.external.docs.datasets}>Datasets Docs.</PageDocLink>
      </PageSubtitle>
    );
  };

  const action = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Create Dataset</Button>
        </DialogTrigger>
        <CreateDatasetDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      </Dialog>
    );
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs} subtitle={subtitle} action={action}>
      <div className="grid grid-cols-4 gap-4">
        {datasets.map((dataset) => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </div>
    </PageLayout>
  );
};
