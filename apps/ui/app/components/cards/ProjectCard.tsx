import { EnvironmentDto, FullProjectDto } from "@montelo/browser-client";
import { Delete, MoreHorizontal } from "lucide-react";
import { Link } from "@remix-run/react";
import { FC, useState } from "react";
import { EnvParams, Routes } from "../../routes";
import { sortEnvironmentsByName } from "../../utils/sortEnvironmentsByName";
import { Label } from "../ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DeleteProjectConfirmDialog } from "../dialogs/DeleteProjectConfirmDialog";

type HomePageCardProps = {
  orgId: string;
  project: FullProjectDto;
}
export const ProjectCard: FC<HomePageCardProps> = ({ orgId, project }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const projectName = project.name;

  const EnvironmentsView = ({ env, addMargin }: { env: EnvironmentDto; addMargin: boolean }) => {
    const params: EnvParams = {
      envId: env.id,
      projectId: env.projectId,
    };

    return (
      <Link to={Routes.app.project.env.dashboard(params)} prefetch={"intent"}
            className={`hover:underline font-light ${addMargin ? 'mr-4' : ''}`}>
        {env.name}
      </Link>
    );
  };

  const ProjectView = ({ environments }: FullProjectDto) => {
    const sortedEnvironments = sortEnvironmentsByName(environments);

    return (
      <div className={"mb-4"}>
        <div className={"mt-2 flex flex-wrap"}>
          {sortedEnvironments.map((environment, index) => (
            <EnvironmentsView key={environment.id} env={environment} addMargin={index !== sortedEnvironments.length - 1} />
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
            {projectName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col">
              <ProjectView key={project.id} {...project} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
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
      <DeleteProjectConfirmDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        projectName={project.name}
        projectId={project.id}
      />
    </div>
  );
};