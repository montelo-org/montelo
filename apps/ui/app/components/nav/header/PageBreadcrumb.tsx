import { EnvironmentDto, FullProjectDto } from "@montelo/browser-client";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useNavigate } from "@remix-run/react";
import { Check } from "lucide-react";
import { FC, useState } from "react";
import { CreateEnvDialog } from "~/components/dialogs/CreateEnvDialog/CreateEnvDialog";
import { CreateProjectDialog } from "~/components/dialogs/CreateProjectDialog/CreateProjectDialog";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Routes } from "~/routes";

type PageBreadcrumbProps = {
  project: FullProjectDto;
  allProjects: FullProjectDto[];
  environment: EnvironmentDto;
};

export const PageBreadcrumb: FC<PageBreadcrumbProps> = ({ project, allProjects, environment }) => {
  const [isCreateEnvDialogOpen, setIsCreateEnvDialogOpen] = useState<boolean>(false);
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] = useState<boolean>(false);

  const ProjectBreadcrumb: FC<{ project: FullProjectDto; allProjects: FullProjectDto[] }> = ({
    project,
    allProjects,
  }) => {
    const navigate = useNavigate();

    const handleProjectClickToDevelopment = (p: FullProjectDto) => {
      const devId = p.environments.find((env) => env.name === "Development")!.id;
      const path = Routes.app.project.env.dashboard({
        projectId: p.id,
        envId: devId,
      });
      navigate(path);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger className={"hover:text-muted-foreground"}>{project.name}</DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {allProjects.map((p) => (
            <DropdownMenuItem
              key={p.id}
              className={"flex flex-row gap-2"}
              onClick={() => handleProjectClickToDevelopment(p)}
            >
              {project.id === p.id && <Check size={16} />}
              {p.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>Create Project</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const EnvironmentBreadcrumb: FC<{ environment: EnvironmentDto; project: FullProjectDto }> = ({
    environment,
    project,
  }) => {
    const navigate = useNavigate();

    const handleEnvClick = (env: EnvironmentDto) => {
      const path = Routes.app.project.env.dashboard({
        projectId: env.projectId,
        envId: env.id,
      });
      navigate(path);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger className={"hover:text-muted-foreground"}>{environment.name}</DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {project.environments.map((env) => (
            <DropdownMenuItem key={env.id} className={"flex flex-row gap-2"} onSelect={() => handleEnvClick(env)}>
              {environment.id === env.id && <Check size={16} />}
              {env.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>Create Environment</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className={"text-muted-foreground flex h-8 items-center gap-2 text-sm font-semibold"}>
      <Dialog open={isCreateProjectDialogOpen} onOpenChange={setIsCreateProjectDialogOpen}>
        <ProjectBreadcrumb project={project} allProjects={allProjects} />
        <CreateProjectDialog isOpen={isCreateProjectDialogOpen} onClose={() => setIsCreateProjectDialogOpen(false)} />
      </Dialog>
      <ChevronRightIcon />
      <Dialog open={isCreateEnvDialogOpen} onOpenChange={setIsCreateEnvDialogOpen}>
        <EnvironmentBreadcrumb environment={environment} project={project} />
        <CreateEnvDialog
          projectId={project.id}
          isOpen={isCreateEnvDialogOpen}
          onClose={() => setIsCreateEnvDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
};
