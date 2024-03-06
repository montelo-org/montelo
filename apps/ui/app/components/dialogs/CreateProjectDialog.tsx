import { FormEventHandler, useState } from "react";
import { Form, useRevalidator } from "@remix-run/react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Routes } from "~/routes";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";

type CreateProjectDialogProps = {
  orgId: string;
}

export const CreateProjectDialog = ({ orgId }: CreateProjectDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [environments, setEnvironments] = useState<string[]>([""]);
  const revalidator = useRevalidator();

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

  // NOTE: turn this into useFetcher
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const nameInput = event.currentTarget.elements.namedItem("name") as HTMLInputElement;
    if (!nameInput.value.trim()) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.append("orgId", orgId);

    await fetch(Routes.actions.project.create, {
      method: "POST",
      body: formData,
    });
    revalidator.revalidate();

    // Reset dialog state
    setIsDialogOpen(false);
    setEnvironments([""]);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form method="post" action={Routes.actions.project.create} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex-row items-center space-y-1">
              <input type="hidden" name="orgId" value={orgId} />
              <Label htmlFor="name" className="text-right font-bold text-base">
                Project Name *
              </Label>
              <Input id="name" name={"name"} placeholder={"Project X"} />
            </div>

            <div className="flex items-center gap-1">
              <Label htmlFor="environmentName" className="text-right font-bold text-base">
                Environments
              </Label>
            </div>
            <div className={"flex flex-col gap-2"}>
              <p>Each project has <span className={"font-bold"}>Production</span> and <span
                className={"font-bold"}>Development</span> environments by default.</p>
              <p>Create additional environments below.</p>
            </div>
            <div className={"flex flex-col gap-2"}>
              {environments.map((environment, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    id={`environment-${index}`}
                    name="environments"
                    value={environment}
                    placeholder="Environment name (optional)"
                    onChange={(e) => handleEnvironmentChange(index, e.target.value)}
                  />
                  <Button type={"button"} variant="ghost" size="icon"
                          onClick={() => handleDeleteEnvironment(index)}>
                    <Trash className={"text-destructive"} size={16} />
                  </Button>
                </div>
              ))}
              <Button type={"button"} variant={"outline"} onClick={handleAddEnvironment}
                      className={"self-end w-1/3"}>Add Another</Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create project</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
