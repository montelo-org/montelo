import { CaretSortIcon } from "@radix-ui/react-icons";
import { FormEventHandler, useState } from "react";
import { useFetcher } from "@remix-run/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Routes } from "../../routes";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Trash } from "lucide-react";

type NewProjectDialogProps = {
  teamId: string;
  teamName: string;
}

export const NewProjectDialog = ({ teamName, teamId }: NewProjectDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(false);
  const [environments, setEnvironments] = useState<string[]>([""]);
  const fetcher = useFetcher();

  const handleAddEnvironment = () => {
    setEnvironments([...environments, ""]);
  };

  const handleDeleteEnvironment = (index: number) => {
    const newEnvironments = environments.filter((_, i) => i !== index);
    setEnvironments(newEnvironments);
  };

  const handleEnvironmentChange = (index: number, value: string) => {
    const newEnvironments = environments.map((env, i) => i === index ? value : env);
    setEnvironments(newEnvironments);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const nameInput = event.currentTarget.elements.namedItem("name") as HTMLInputElement;
    if (!nameInput.value.trim()) {
      return;
    }

    fetcher.submit(event.currentTarget);
    setIsDialogOpen(false);
    setIsCollapseOpen(false);
    setEnvironments([""]);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Add Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <fetcher.Form method="post" action={Routes.actions.project.create} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>
              Add a project to the <span className={"font-bold"}>{teamName}</span> team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex-row items-center space-y-1">
              <input type="hidden" name="teamId" value={teamId} />
              <Label htmlFor="name" className="text-right font-bold text-base">
                Project Name *
              </Label>
              <Input id="name" name={"name"} placeholder={"Project X"} />
            </div>

            <Collapsible
              open={isCollapseOpen}
              onOpenChange={setIsCollapseOpen}
            >
              <div className="flex items-center gap-1">
                <Label htmlFor="environmentName" className="text-right font-bold text-base">
                  Environments
                </Label>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <CaretSortIcon />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className={"flex flex-col gap-2"}>
                  {environments.map((environment, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        id={`environment-${index}`}
                        name="environments"
                        value={environment}
                        placeholder="Environment name"
                        onChange={(e) => handleEnvironmentChange(index, e.target.value)}
                      />
                      <Button type={"button"} variant="ghost" size="icon" onClick={() => handleDeleteEnvironment(index)}>
                        <Trash className={"text-destructive"} size={16} />
                      </Button>
                    </div>
                  ))}
                  <Button type={"button"} variant={"outline"} onClick={handleAddEnvironment} className={"self-end w-1/3"}>Add Another</Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <DialogFooter>
            <Button type="submit">Add project to {teamName}</Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
};