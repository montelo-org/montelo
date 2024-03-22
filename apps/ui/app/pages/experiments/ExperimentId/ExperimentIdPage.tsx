import { FullExperimentDto } from "@montelo/browser-client";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Link, useParams } from "@remix-run/react";
import dayjs from "dayjs";
import { FC } from "react";
import { PageBreadcrumbContainer } from "~/components/PageBreadcrumbContainer";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { DatapointRunsTable } from "~/pages/experiments/ExperimentId/DatapointRunsTable";
import { TopCard } from "~/pages/experiments/ExperimentId/TopCard";
import { Routes } from "~/routes";


type ExperimentsPageProps = {
  fullExperiment: FullExperimentDto;
};

export const ExperimentIdPage: FC<ExperimentsPageProps> = ({ fullExperiment }) => {
  const params = useParams();

  return (
    <div className={"mt-2 flex flex-col"}>
      <PageBreadcrumbContainer>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={Routes.app.project.env.experiments({
              envId: params.envId!,
              projectId: params.projectId!,
            })}
          >
            Experiments
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage>{fullExperiment.name}</BreadcrumbPage>
      </PageBreadcrumbContainer>

      <div className="mt-8 grid grid-cols-3 gap-8">
        <TopCard
          title={"Experiment"}
          description={() => (
            <div>
              <p>{fullExperiment.description}</p>
              <p>Started on {dayjs(fullExperiment.createdAt).format("MMMM D, h:mm a")}</p>
            </div>
          )}
        />
        <TopCard
          title={"Dataset"}
          description={() => (
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
          description={() => (
            <div>
              <p>{fullExperiment.datapointRuns.length} datapoints ran</p>
              <p>0 failures</p>
            </div>
          )}
        />
      </div>
      
      <div className={"flex justify-end mt-8"}>
        <Button>View Schemas</Button>
      </div>

      {/* datapoint runs*/}
      <div className={""}>
        <DatapointRunsTable datapointRuns={fullExperiment.datapointRuns} />
      </div>
    </div>
  );
};
