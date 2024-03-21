import { FullDatasetDto } from "@montelo/browser-client";
import { Link, useParams } from "@remix-run/react";
import { FC } from "react";
import { PageBreadcrumbContainer } from "~/components/PageBreadcrumbContainer";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { DatapointsTable } from "~/pages/datasets/dataset/DatapointsTable";
import { DatasetSchemaDialog } from "~/pages/datasets/dataset/DatasetSchemaDialog";
import { Routes } from "~/routes";

type DatasetIdPageProps = {
  dataset: FullDatasetDto;
  currentPage: number;
  totalPages: number;
};

export const DatasetIdPage: FC<DatasetIdPageProps> = ({ dataset, currentPage, totalPages }) => {
  const params = useParams();

  return (
    <div className={"mt-2"}>
      <PageBreadcrumbContainer>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to={Routes.app.project.env.datasets({
                projectId: params.projectId!,
                envId: dataset.envId,
              })}
            >
              Datasets
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage>{dataset.name}</BreadcrumbPage>
      </PageBreadcrumbContainer>

      <div className={"mb-8 flex flex-row items-end justify-between"}>
        <div className={"flex flex-col gap-1"}>
          <p>Slug ➯ {dataset.slug}</p>
          <p>{dataset.description}</p>
        </div>
        <DatasetSchemaDialog inputSchema={dataset.inputSchema} outputSchema={dataset.outputSchema} />
      </div>

      <DatapointsTable datapoints={dataset.datapoints} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};
