import { ExperimentDto } from "@montelo/browser-client";
import { FC } from "react";
import { PageBreadcrumbContainer } from "~/components/PageBreadcrumbContainer";
import { BreadcrumbPage } from "~/components/ui/breadcrumb";
import { ExperimentsTable } from "~/pages/experiments/ExperimentsTable";

type ExperimentsPageProps = {
  experiments: ExperimentDto[];
};

export const ExperimentsPage: FC<ExperimentsPageProps> = ({ experiments }) => {
  return (
    <div className={"mt-2 flex flex-col"}>
      <PageBreadcrumbContainer>
        <BreadcrumbPage>Experiments</BreadcrumbPage>
      </PageBreadcrumbContainer>

      <ExperimentsTable experiments={experiments} />
    </div>
  );
};
