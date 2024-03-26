import { ExperimentDto, FullDatasetDto } from "@montelo/browser-client";
import { useParams } from "@remix-run/react";
import { Database } from "lucide-react";
import { FC } from "react";
import { DatapointsTable } from "~/pages/datasets/dataset/DatapointsTable";
import { DatasetSchemaDialog } from "~/pages/datasets/dataset/DatasetSchemaDialog";
import { RecentExperimentsTable } from "~/pages/datasets/dataset/RecentExperimentsTable";
import { PageDocLink } from "~/pages/layouts/PageDocLink";
import { PageLayout } from "~/pages/layouts/PageLayout";
import { PageSubtitle } from "~/pages/layouts/PageSubtitle";
import { LayoutBreadcrumb } from "~/pages/layouts/types";
import { Routes } from "~/routes";

type DatasetIdPageProps = {
  dataset: FullDatasetDto;
  currentPage: number;
  totalPages: number;
  experiments: ExperimentDto[];
  totalCount: number;
};

export const DatasetIdPage: FC<DatasetIdPageProps> = ({
  dataset,
  currentPage,
  totalPages,
  experiments,
  totalCount,
}) => {
  const params = useParams();

  const breadcrumbs: LayoutBreadcrumb[] = [
    {
      label: "Datasets",
      to: Routes.app.project.env.datasets({
        projectId: params.projectId!,
        envId: dataset.envId,
      }),
    },
    {
      label: dataset.name,
    },
  ];

  const subtitle = () => {
    return (
      <PageSubtitle>
        Datasets consist of datapoints that adhere to an input/expected output schema.{" "}
        <PageDocLink to={Routes.external.docs.datasets}>Datasets Docs.</PageDocLink>
      </PageSubtitle>
    );
  };

  const action = () => {
    return (
      <DatasetSchemaDialog slug={dataset.slug} inputSchema={dataset.inputSchema} outputSchema={dataset.outputSchema} />
    );
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs} subtitle={subtitle} action={action}>
      <div className={"flex flex-col gap-8"}>
        <div className={"flex flex-col"}>
          <p className={"flex items-center gap-2 text-xl font-semibold"}>
            <Database size={20} />
            Dataset
          </p>
          <p className={"text-muted-foreground"}>{dataset.description}</p>
          <p className={"text-muted-foreground"}>Slug ➯ {dataset.slug}</p>
        </div>

        <DatapointsTable
          datapoints={dataset.datapoints}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
        />
        <RecentExperimentsTable experiments={experiments} />
      </div>
    </PageLayout>
  );
};
