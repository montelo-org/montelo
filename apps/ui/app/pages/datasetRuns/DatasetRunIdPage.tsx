import { DatapointRunWithExperimentDto, TraceWithLogsDto } from "@montelo/browser-client";
import { useParams } from "@remix-run/react";
import { FC } from "react";
import { PageDocLink } from "~/pages/layouts/PageDocLink";
import { PageSubtitle } from "~/pages/layouts/PageSubtitle";
import { LayoutBreadcrumb } from "~/pages/layouts/types";
import { TraceIdContent } from "~/pages/traces/TraceIdContent";
import { Routes } from "~/routes";
import { PageLayout } from "../layouts/PageLayout";
import { idShortener } from "~/pages/traces/utils";

type DatasetRunIdPageProps = {
  trace: TraceWithLogsDto;
  datapointRun: DatapointRunWithExperimentDto;
};

export const DatasetRunIdPage: FC<DatasetRunIdPageProps> = ({ trace, datapointRun }) => {
  const params = useParams();

  const { short } = idShortener(datapointRun.id);

  const breadcrumbs: LayoutBreadcrumb[] = [
    {
      label: "Experiments",
      to: Routes.app.project.env.experiments({
        envId: params.envId!,
        projectId: params.projectId!,
      }),
    },
    {
      label: datapointRun.experiment.name || "—",
      to: Routes.app.project.env.experimentsId({
        envId: params.envId!,
        projectId: params.projectId!,
        experimentId: params.experimentId!,
      }),
    },
    {
      label: `Run ${short}`,
    },
  ];

  const subtitle = () => {
    return (
      <PageSubtitle>
        Each run generates a trace to help you debug.{" "}
        <PageDocLink to={Routes.external.documentation}>Run Docs.</PageDocLink>
      </PageSubtitle>
    );
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs} subtitle={subtitle}>
      <TraceIdContent trace={trace} />
    </PageLayout>
  );
};
