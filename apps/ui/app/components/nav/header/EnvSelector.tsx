import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { EnvironmentDto } from "@montelo/browser-client";
import { Check, ChevronsUpDown } from "lucide-react";
import { sortEnvironmentsByName } from "../../../utils/sortEnvironmentsByName";
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
import { useOrganization } from "@clerk/remix";

type EnvSelectorProps = {
  environments: EnvironmentDto[];
  pathEnv: EnvironmentDto;
};

export const EnvSelector = ({ environments, pathEnv }: EnvSelectorProps) => {
  const { isLoaded, organization } = useOrganization();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedEnvName, setSelectedEnvName] = useState<string>(pathEnv.name);
  const navigate = useNavigate();

  const sortedEnvironments = sortEnvironmentsByName(environments);

  const handleMenuItemClick = (env: EnvironmentDto) => {
    if (!isLoaded || !organization) {
      return;
    }

    setSelectedEnvName(env.name);
    const path = Routes.app.org.project.env.dashboard({
      orgId: organization.id,
      projectId: env.projectId,
      envId: env.id,
    });
    navigate(path);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className={"w-full"}>
          <Button variant="outline"
                  className={`text-muted-foreground ${pathEnv.name === "Production" ? "border-orange-600 border-2" : ""} justify-between`}>
            {selectedEnvName}
            <ChevronsUpDown size={16} />
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
                  {selectedEnvName === env.name && <Check size={20} />}
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
