import { TraceWithLogsDto } from "@montelo/browser-client";
import { useParams } from "@remix-run/react";
import { TraceIdContent } from "~/pages/traces/TraceIdContent";
import { PageDocLink } from "~/pages/layouts/PageDocLink";
import { PageLayout } from "~/pages/layouts/PageLayout";
import { PageSubtitle } from "~/pages/layouts/PageSubtitle";
import { LayoutBreadcrumb } from "~/pages/layouts/types";
import { Routes } from "~/routes";
import { Button } from "~/components/ui/button";

type TraceIdProps = {
  trace: TraceWithLogsDto;
};

export const TraceIdPage = ({ trace }: TraceIdProps) => {
  const params = useParams();

  const breadcrumbs: LayoutBreadcrumb[] = [
    {
      label: "Traces",
      to: Routes.app.project.env.traces({
        projectId: params.projectId!,
        envId: trace.envId,
      }),
    },
    {
      label: trace.name || "—",
    },
  ];

  const subtitle = () => {
    return (
      <PageSubtitle>
        A single trace can group LLM API calls, vector db calls, and anything else. <PageDocLink to={Routes.external.documentation}>Trace Docs.</PageDocLink>
      </PageSubtitle>
    );
  };

  const action = () => {
    return <Button>Add to Dataset</Button>;
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs} subtitle={subtitle} action={action}>
      <TraceIdContent trace={trace} />
    </PageLayout>
  );
};
