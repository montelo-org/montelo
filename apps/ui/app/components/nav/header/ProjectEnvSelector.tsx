import { EnvironmentDto, FullProjectDto } from "@montelo/browser-client";
import { useNavigate } from "@remix-run/react";
import { Check, Slash } from "lucide-react";
import { FC } from "react";
import { Routes } from "~/routes";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

type EnvSelectorProps = {
  projects: FullProjectDto[];
  selectedProject: FullProjectDto;
  selectedEnvironment: EnvironmentDto;
};

export const ProjectEnvSelector: FC<EnvSelectorProps> = ({ projects, selectedProject, selectedEnvironment }) => {
  const navigate = useNavigate();

  const handleMenuItemClick = (env: EnvironmentDto) => {
    const path = Routes.app.project.env.dashboard({
      projectId: env.projectId,
      envId: env.id,
    });
    navigate(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={"text-muted-foreground h-8 justify-between gap-2"}>
          <div>{selectedProject.name}</div>
          <div>/</div>
          <div>{selectedEnvironment.name}</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Projects / Environments</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {projects.map((project) => (
          <DropdownMenuGroup key={project.id}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <div className={"flex flex-row gap-2"}>
                  {selectedProject.id === project.id && <Check size={16} />}
                  {project.name}
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {project.environments.map((env) => (
                    <DropdownMenuItem key={env.id} onSelect={() => handleMenuItemClick(env)}>
                      <div className={"flex flex-row gap-2"}>
                        {selectedEnvironment.id === env.id && <Check size={16} />}
                        {env.name}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
