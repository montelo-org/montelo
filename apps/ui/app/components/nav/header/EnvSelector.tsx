import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { EnvironmentDto } from "@montelo/browser-client";
import { Check, ChevronsUpDown } from "lucide-react";
import { sortEnvironmentsByName } from "../../../utils/sorters";
import { Dialog } from "../../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Routes } from "../../../routes";

type EnvSelectorProps = {
  environments: EnvironmentDto[];
  pathEnv: EnvironmentDto;
};

export const EnvSelector = ({ environments, pathEnv }: EnvSelectorProps) => {
  const [showChevron, setShowEvron] = useState<boolean>(false);
  const navigate = useNavigate();

  const sortedEnvironments = sortEnvironmentsByName(environments);

  const handleMenuItemClick = (env: EnvironmentDto) => {
    const path = Routes.app.project.env.dashboard({
      projectId: env.projectId,
      envId: env.id,
    });
    navigate(path);
  };

  const showChevronFunc = () => {
    setShowEvron(true);
  };

  const hideChevron = () => {
    setShowEvron(false);
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onMouseEnter={showChevronFunc} onMouseLeave={hideChevron}>
          <Button
            variant="ghost"
            className={"text-muted-foreground justify-between"}>
            {pathEnv.name}
            {showChevron && <ChevronsUpDown size={20} />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuLabel>
            Environments
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {sortedEnvironments.map((env) => (
              <DropdownMenuItem key={env.id} onSelect={() => handleMenuItemClick(env)}>
                <div className={"flex flex-row gap-2"}>
                  {pathEnv.id === env.id && <Check size={20} />}
                  {env.name}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};
