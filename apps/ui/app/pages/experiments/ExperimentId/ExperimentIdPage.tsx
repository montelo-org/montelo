import { FullExperimentDto } from "@montelo/browser-client";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Link, useParams } from "@remix-run/react";
import dayjs from "dayjs";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import { DatapointRunsTable } from "~/pages/experiments/ExperimentId/DatapointRunsTable";
import { TopCard } from "~/pages/experiments/ExperimentId/TopCard";
import { PageDocLink } from "~/pages/layouts/PageDocLink";
import { PageLayout } from "~/pages/layouts/PageLayout";
import { PageSubtitle } from "~/pages/layouts/PageSubtitle";
import { LayoutBreadcrumb } from "~/pages/layouts/types";
import { Routes } from "~/routes";

type ExperimentsPageProps = {
  fullExperiment: FullExperimentDto;
  totalDatapointRuns: number;
  currentPage: number;
  totalPages: number;
};

export const ExperimentIdPage: FC<ExperimentsPageProps> = ({
  fullExperiment,
  totalDatapointRuns,
  currentPage,
  totalPages,
}) => {
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
      label: fullExperiment.name || "—",
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

  const action = () => {
    return <Button>View Code</Button>;
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs} subtitle={subtitle} action={action}>
      <div className="grid grid-cols-3 gap-8">
        <TopCard
          title={"Experiment"}
          content={() => (
            <div>
              <p>{fullExperiment.description}</p>
              <p>Started on {dayjs(fullExperiment.createdAt).format("MMMM D, h:mm a")}</p>
            </div>
          )}
        />
        <TopCard
          title={"Dataset"}
          content={() => (
            <div>
              <p className={"flex items-center"}>
                {fullExperiment.dataset.name}
                <Link
                  className={"hover:text-accent-foreground pl-1"}
                  to={Routes.app.project.env.datasetsId({
                    projectId: params.projectId!,
                    envId: params.envId!,
                    datasetId: fullExperiment.dataset.id,
                  })}
                  prefetch={"intent"}
                >
                  <ExternalLinkIcon />
                </Link>
              </p>
              <p>{fullExperiment.dataset.description}</p>
            </div>
          )}
        />
        <TopCard
          title={"Analytics"}
          content={() => (
            <div>
              <p>{totalDatapointRuns} runs</p>
              <p>0 failures</p>
            </div>
          )}
        />
      </div>

      {/* datapoint runs*/}
      <div>
        <p className={"text-xl font-semibold"}>Runs</p>
        <p className={"text-muted-foreground mb-4"}>
          Each run is a datapoint from the dataset that was executed in this experiment.{" "}
          <PageDocLink to={Routes.external.documentation}>Run Docs.</PageDocLink>
        </p>
        <DatapointRunsTable
          datapointRuns={fullExperiment.datapointRuns}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </PageLayout>
  );
};
