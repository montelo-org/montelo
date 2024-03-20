import { EnvironmentDto, FullProjectDto } from "@montelo/browser-client";
import { useNavigate } from "@remix-run/react";
import { Check } from "lucide-react";
import { FC, useState } from "react";
import { CreateEnvDialog } from "~/components/dialogs/CreateEnvDialog";
import { CreateProjectDialog } from "~/components/dialogs/CreateProjectDialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Routes } from "~/routes";
import { AppLayoutLoader } from "~/types/AppLayoutLoader.types";

export const HeaderBreadcrumb: FC<AppLayoutLoader> = ({ org, allProjects, project, environment }) => {
  const [isCreateEnvDialogOpen, setIsCreateEnvDialogOpen] = useState<boolean>(false);
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] = useState<boolean>(false);

  const MonteloBreadcrumb: FC = () => {
    return (
      <BreadcrumbItem>
        <BreadcrumbLink href={Routes.app.project.all}>
          <div>
            <img src="/LogoIconOnly.svg" alt="Montelo Logo" className={"h-5"} />
          </div>
        </BreadcrumbLink>
      </BreadcrumbItem>
    );
  };

  const OrganizationBreadcrumb: FC = () => {
    return (
      <BreadcrumbItem>
        <BreadcrumbLink href={Routes.app.org}>{org.name}</BreadcrumbLink>
      </BreadcrumbItem>
    );
  };

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
      <BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger>{project.name}</DropdownMenuTrigger>
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
      </BreadcrumbItem>
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
      <BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger>{environment.name}</DropdownMenuTrigger>
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
      </BreadcrumbItem>
    );
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <MonteloBreadcrumb />
        <BreadcrumbSeparator />
        <OrganizationBreadcrumb />
        {project && allProjects && (
          <Dialog open={isCreateProjectDialogOpen} onOpenChange={setIsCreateProjectDialogOpen}>
            <BreadcrumbSeparator />
            <ProjectBreadcrumb project={project} allProjects={allProjects} />
            <CreateProjectDialog onClose={() => setIsCreateEnvDialogOpen(false)} />
          </Dialog>
        )}
        {environment && project && (
          <Dialog open={isCreateEnvDialogOpen} onOpenChange={setIsCreateEnvDialogOpen}>
            <BreadcrumbSeparator />
            <EnvironmentBreadcrumb environment={environment} project={project} />
            <CreateEnvDialog projectId={project.id} onClose={() => setIsCreateEnvDialogOpen(false)} />
          </Dialog>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
