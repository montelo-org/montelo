import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Routes } from "~/routes";
import { useFetcher } from "@remix-run/react";
import { FC, useState } from "react";

type CreateEnvDialogProps = {
  projectId: string;
  onClose: () => void;
}
export const CreateEnvDialog: FC<CreateEnvDialogProps> = ({ projectId, onClose }) => {
  const [envName, setEnvName] = useState<string>("");
  const fetcher = useFetcher();

  const handleCreateEnvironment = async () => {
    const payload = {
      envName,
      projectId,
    };
    fetcher.submit(payload, {
      method: "POST",
      action: Routes.actions.env.create,
    });
    onClose();
  };

  return (
    <DialogContent className={"w-96"}>
      <DialogHeader>
        <DialogTitle>Create Environment</DialogTitle>
        <DialogDescription>
          Create a new environment for the selected project.
        </DialogDescription>
      </DialogHeader>
      <Input
        className={"w-1/2"}
        name="envName"
        value={envName}
        placeholder="Environment name"
        onChange={(e) => setEnvName(e.target.value)}
      />
      <DialogFooter>
        <Button onClick={handleCreateEnvironment}>Create</Button>
      </DialogFooter>
    </DialogContent>
  );
};