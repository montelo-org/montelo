import { useState } from "react";
import { useFetcher, useNavigate } from "@remix-run/react";
import { ApiKeyWithEnvDto, EnvironmentDto } from "@montelo/browser-client";
import { Check, ChevronsUpDown, KeyRound } from "lucide-react";
import { sortEnvironmentsByName } from "../../../utils/sortEnvironmentsByName";
import { Routes } from "../../../routes";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { ApiKeysDialog } from "../../dialogs/ApiKeys/ApiKeysDialog";

type EnvSelectorProps = {
  environments: EnvironmentDto[];
  pathEnv: EnvironmentDto;
};

export const EnvSelector = ({ environments, pathEnv }: EnvSelectorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedEnvName, setSelectedEnvName] = useState<string>(pathEnv.name);
  const fetcher = useFetcher<ApiKeyWithEnvDto[]>();
  const navigate = useNavigate();

  const sortedEnvironments = sortEnvironmentsByName(environments);

  const handleMenuItemClick = (env: EnvironmentDto) => {
    setSelectedEnvName(env.name);
    const path = `/project/${env.projectId}/env/${env.id}/dashboard`;
    navigate(path);
  };

  const prefetchApiKeys = () => fetcher.load(Routes.actions.project.getAllApiKeys(pathEnv.projectId));

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
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem onMouseEnter={prefetchApiKeys}>
              <div className={"flex flex-row gap-2"}>
                <KeyRound size={20} />
                <p>API Keys</p>
              </div>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <ApiKeysDialog apiKeys={fetcher.data} />
    </Dialog>
  );
};
