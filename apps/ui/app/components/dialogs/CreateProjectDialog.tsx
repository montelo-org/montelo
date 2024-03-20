import { useOrganization } from "@clerk/remix";
import { Form, useRevalidator } from "@remix-run/react";
import { Trash } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { Routes } from "~/routes";
import { Button } from "../ui/button";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type CreateProjectDialogProps = {
  onClose: () => void;
};

export const CreateProjectDialog = ({ onClose }: CreateProjectDialogProps) => {
  const { organization } = useOrganization();
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
    const newEnvironments = environments.map((env, i) => (i === index ? value : env));
    setEnvironments(newEnvironments);
  };

  // NOTE: turn this into useFetcher
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!organization) {
      return;
    }

    const nameInput = event.currentTarget.elements.namedItem("name") as HTMLInputElement;
    if (!nameInput.value.trim()) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    await fetch(Routes.actions.project.create, {
      method: "POST",
      body: formData,
    });
    revalidator.revalidate();

    // Reset dialog state
    onClose();
    setEnvironments([""]);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form method="POST" action={Routes.actions.project.create} onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex-row items-center space-y-1">
            <Label htmlFor="name" className="text-right text-base font-bold">
              Project Name *
            </Label>
            <Input id="name" name={"name"} placeholder={"Project X"} />
          </div>

          <div className="flex items-center gap-1">
            <Label htmlFor="environmentName" className="text-right text-base font-bold">
              Environments
            </Label>
          </div>
          <div className={"flex flex-col gap-2"}>
            <p>
              Each project has <span className={"font-bold"}>Production</span> and{" "}
              <span className={"font-bold"}>Development</span> environments by default.
            </p>
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
                <Button type={"button"} variant="ghost" size="icon" onClick={() => handleDeleteEnvironment(index)}>
                  <Trash className={"text-destructive"} size={16} />
                </Button>
              </div>
            ))}
            <Button type={"button"} variant={"outline"} onClick={handleAddEnvironment} className={"w-1/3 self-end"}>
              Add Another
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create project</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
};
