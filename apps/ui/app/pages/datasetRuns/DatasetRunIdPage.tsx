import { DatapointRunWithExperimentDto, TraceWithLogsDto } from "@montelo/browser-client";
import { useParams } from "@remix-run/react";
import { FC } from "react";
import { PageDocLink } from "~/pages/layouts/PageDocLink";
import { PageSubtitle } from "~/pages/layouts/PageSubtitle";
import { LayoutBreadcrumb } from "~/pages/layouts/types";
import { TraceIdContent } from "~/pages/traces/TraceIdContent";
import { Routes } from "~/routes";
import { PageLayout } from "../layouts/PageLayout";

type DatasetRunIdPageProps = {
  trace: TraceWithLogsDto | null;
  datapointRun: DatapointRunWithExperimentDto | null;
};

export const DatasetRunIdPage: FC<DatasetRunIdPageProps> = ({ trace, datapointRun }) => {
  const params = useParams();

  const breadcrumbs: LayoutBreadcrumb[] = [
    {
      label: "Experiments",
      to: Routes.app.project.env.experiments({
        envId: params.envId!,
        projectId: params.projectId!,
      }),
    },
    {
      label: datapointRun?.experiment.name || "—",
      to: Routes.app.project.env.experimentsId({
        envId: params.envId!,
        projectId: params.projectId!,
        experimentId: params.experimentId!,
      }),
    },
    {
      label: "Run",
    },
  ];

  const subtitle = () => {
    return (
      <PageSubtitle>
        Each run generates a trace to help you debug.{" "}
        <PageDocLink to={Routes.external.docs.runs}>Run Docs.</PageDocLink>
      </PageSubtitle>
    );
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs} subtitle={subtitle}>
      {trace ? <TraceIdContent trace={trace} /> : <p>No Trace on this run.</p>}
    </PageLayout>
  );
};
