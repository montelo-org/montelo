import { FullProjectDto } from "@montelo/browser-client";
import { FC } from "react";
import { ProjectCard } from "../../components/cards/ProjectCard";
import { CreateProjectDialog } from "../../components/dialogs/CreateProjectDialog";

type OrgIdPageProps = {
  orgId: string;
  projects?: FullProjectDto[];
};

export const OrgProjectsPage: FC<OrgIdPageProps> = ({ orgId, projects }) => {
  return (
    <div className={"flex w-full justify-center"}>
      <div className={"flex w-1/2 flex-col"}>
        <div className={"mb-4 mt-4 flex justify-end"}>
          <CreateProjectDialog orgId={orgId} />
        </div>
        <div className={"grid grid-cols-2 gap-4"}>
          {projects?.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </div>
  );
};
