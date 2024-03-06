import { FullProjectDto } from "@montelo/browser-client";
import { FC } from "react";
import { ProjectCard } from "../../components/cards/ProjectCard";
import { CreateProjectDialog } from "../../components/dialogs/CreateProjectDialog";

type OrgIdPageProps = {
  orgId: string;
  projects?: FullProjectDto[];
}

export const OrgProjectsPage: FC<OrgIdPageProps> = ({ orgId, projects }) => {
  return (
    <div className={"flex justify-center w-full"}>
      <div className={"flex flex-col w-1/2 justify-center"}>
        <div className={"flex justify-end mb-4"}>
          <CreateProjectDialog orgId={orgId} />
        </div>
        <div className={"grid grid-cols-2 gap-4"}>
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};
