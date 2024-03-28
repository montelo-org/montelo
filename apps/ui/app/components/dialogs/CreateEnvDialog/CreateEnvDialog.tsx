import { Form, useFetcher, useNavigate } from "@remix-run/react";
import { FC, useEffect, useState } from "react";
import { useRemixForm } from "remix-hook-form";
import { CreateEnvResolver } from "~/components/dialogs/CreateEnvDialog/CreateEnvValidator";
import { CreateEnvActionData } from "~/components/dialogs/CreateEnvDialog/types";
import { CreateProjectSchemaType } from "~/components/dialogs/CreateProjectDialog/CreateProjectValidator";
import { Button } from "~/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Routes } from "~/routes";

type CreateEnvDialogProps = {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
};
export const CreateEnvDialog: FC<CreateEnvDialogProps> = ({ projectId, isOpen, onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const fetcher = useFetcher<CreateEnvActionData>();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useRemixForm<CreateProjectSchemaType>({
    mode: "onSubmit",
    resolver: CreateEnvResolver,
    fetcher,
    submitConfig: {
      method: "post",
      action: Routes.actions.env.create(projectId),
    },
  });

  const checkIfSuccessful = () => {
    if (!fetcher.data) {
      return;
    } else if (fetcher.data.error) {
      setError(fetcher.data.error);
    } else if (fetcher.data.environment) {
      setError(null);
      reset();
      onClose();
      const envId = fetcher.data.environment.id;
      navigate(
        Routes.app.project.env.dashboard({
          projectId,
          envId,
        }),
      );
    }
  };
  useEffect(checkIfSuccessful, [fetcher.data]);

  const resetOnClose = () => {
    if (!isOpen) {
      reset();
      setError(null);
    }
  };
  useEffect(resetOnClose, [isOpen]);

  return (
    <DialogContent className={"w-96"}>
      <DialogHeader>
        <DialogTitle>Create Environment</DialogTitle>
        <DialogDescription>Create a new environment for the selected project.</DialogDescription>
      </DialogHeader>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={isSubmitting}>
          <Input className={"w-1/2"} placeholder="Environment name" {...register("name")} />
          {errors.name && <span className="text-destructive">{errors.name.message}</span>}
          <DialogFooter className={"items-center"}>
            {error && <span className="text-destructive">{error}</span>}
            <Button type={"submit"}>Create</Button>
          </DialogFooter>
        </fieldset>
      </Form>
    </DialogContent>
  );
};
