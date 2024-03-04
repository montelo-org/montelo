import { EnvironmentDto, FullMembershipDto, ProjectWithEnvironmentsDto } from "@montelo/browser-client";
import { Delete, MoreHorizontal } from "lucide-react";
import _ from "lodash";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { Routes } from "../../routes";
import { sortEnvironmentsByName } from "../../utils/sortEnvironmentsByName";
import { Label } from "../ui/label";
import { NewProjectDialog } from "../dialogs/NewProjectDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DeleteTeamConfirmDialog } from "../dialogs/DeleteTeamConfirmDialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

type HomePageCardProps = {
  membership: FullMembershipDto;
}
export const HomePageCard = ({ membership }: HomePageCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const projects = membership.team.projects;
  const teamName = membership.team.name;
  const role = membership.role;

  const EnvironmentsView = ({ env }: { env: EnvironmentDto }) => {
    const params = {
      envId: env.id,
      projectId: env.projectId,
    };

    return (
      <Link to={Routes.app.project.env.dashboard(params)} prefetch={"intent"} className={"hover:underline font-light"}>
        {env.name}
      </Link>
    );
  };

  const ProjectView = ({ name, environments }: ProjectWithEnvironmentsDto) => {
    const sortedEnvironments = sortEnvironmentsByName(environments);

    return (
      <div className={"mb-4"}>
        <div className={"flex justify-between items-center"}>
          <Label className={"text-xl"}>{name}</Label>
        </div>
        <div className={"mt-2 space-x-4"}>
          {sortedEnvironments.map((environment) => (
            <EnvironmentsView key={environment.id} env={environment} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className={"text-2xl"}>
            {teamName}
          </CardTitle>
          <CardDescription className={"text-sm font-light"}>{_.capitalize(role)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col">
              {projects.map((project) => (
                <ProjectView key={project.id} {...project} />
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <NewProjectDialog teamName={teamName} teamId={membership.teamId} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              <DropdownMenuItem className={"text-red-600"} onClick={() => setIsDialogOpen(true)}>
                <Delete size={16} className={"text-red-600"} />&nbsp;
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
      <DeleteTeamConfirmDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        teamName={teamName}
        teamId={membership.teamId}
      />
    </div>
  );
};