import { FullProjectDto } from "@montelo/browser-client";
import { FC, useState } from "react";
import { ProjectCard } from "~/components/cards/ProjectCard";
import { CreateProjectDialog } from "~/components/dialogs/CreateProjectDialog";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";

type OrgIdPageProps = {
  orgId: string;
  projects?: FullProjectDto[];
};

export const OrgProjectsPage: FC<OrgIdPageProps> = ({ orgId, projects }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <div className={"flex w-full justify-center"}>
      <div className={"flex w-1/2 flex-col"}>
        <div className={"mb-4 mt-4 flex justify-end"}>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create Project</Button>
            </DialogTrigger>
            <CreateProjectDialog orgId={orgId} onClose={() => setIsDialogOpen(false)} />
          </Dialog>
        </div>
        <div className={"grid grid-cols-2 gap-4"}>
          {projects?.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </div>
  );
};
