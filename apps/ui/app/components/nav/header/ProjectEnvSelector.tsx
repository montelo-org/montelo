import { EnvironmentDto, FullProjectDto } from "@montelo/browser-client";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "@remix-run/react";
import { Check, Home } from "lucide-react";
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
          {selectedProject.name}
          <ChevronRightIcon />
          {selectedEnvironment.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center gap-1">
          Projects <ChevronRightIcon /> Environments
        </DropdownMenuLabel>
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
        <DropdownMenuSeparator />
        <DropdownMenuItem className={"flex flex-row gap-2"} asChild>
          <Link to={Routes.app.project.all} prefetch={"intent"}>
            <Home size={16} />
            Home
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
