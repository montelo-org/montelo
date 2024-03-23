import { ExperimentDto } from "@montelo/browser-client";
import { FC } from "react";
import { ExperimentsTable } from "~/pages/experiments/ExperimentsTable";
import { PageDocLink } from "~/pages/layouts/PageDocLink";
import { PageLayout } from "~/pages/layouts/PageLayout";
import { PageSubtitle } from "~/pages/layouts/PageSubtitle";
import { LayoutBreadcrumb } from "~/pages/layouts/types";
import { Routes } from "~/routes";

type ExperimentsPageProps = {
  experiments: ExperimentDto[];
};

export const ExperimentsPage: FC<ExperimentsPageProps> = ({ experiments }) => {
  const breadcrumbs: LayoutBreadcrumb[] = [
    {
      label: "Experiments",
    },
  ];

  const subtitle = () => {
    return (
      <PageSubtitle>
        Run experiments from your codebase to validate your system.{" "}
        <PageDocLink to={Routes.external.documentation}>Experiments Docs.</PageDocLink>
      </PageSubtitle>
    );
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs} subtitle={subtitle}>
      <ExperimentsTable experiments={experiments} />
    </PageLayout>
  );
};
