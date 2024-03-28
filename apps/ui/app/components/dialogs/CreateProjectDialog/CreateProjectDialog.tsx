import { Form, useFetcher, useNavigate } from "@remix-run/react";
import { Plus, Trash } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useRemixForm } from "remix-hook-form";
import {
  CreateProjectResolver,
  CreateProjectSchemaType,
} from "~/components/dialogs/CreateProjectDialog/CreateProjectValidator";
import { CreateProjectActionData } from "~/components/dialogs/CreateProjectDialog/types";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Routes } from "~/routes";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";

type CreateProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateProjectDialog: FC<CreateProjectDialogProps> = ({ isOpen, onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const fetcher = useFetcher<CreateProjectActionData>();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    control,
    reset,
  } = useRemixForm<CreateProjectSchemaType>({
    mode: "onSubmit",
    resolver: CreateProjectResolver,
    fetcher,
    submitConfig: {
      method: "post",
      action: Routes.actions.project.create,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "envNames" as never,
  });
  const navigate = useNavigate();

  const checkIfSuccessful = () => {
    if (!fetcher.data) {
      return;
    } else if (fetcher.data.error) {
      setError(fetcher.data.error);
    } else if (fetcher.data.project) {
      setError(null);
      reset();
      onClose();
      const envId = fetcher.data.project.environments.find((env) => env.name === "Development")!.id;
      navigate(
        Routes.app.project.env.dashboard({
          projectId: fetcher.data.project.id,
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
    <DialogContent>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={isSubmitting}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex-row items-center space-y-1">
              <Label htmlFor={"name"} className="text-right text-base font-bold">
                Name
              </Label>
              <Input {...register("name")} placeholder={"Project X"} />
              {errors.name && <span className="text-destructive">{errors.name.message}</span>}
            </div>

            <div className={"flex flex-col gap-2"}>
              <Label htmlFor="envNames" className="text-base font-bold">
                Environments
              </Label>
              <p>
                Each project is created with <span className={"font-bold"}>Production</span> and{" "}
                <span className={"font-bold"}>Development</span> environments by default.
              </p>
              <p>Create additional environments below.</p>
            </div>
            <div className={"flex flex-col gap-2"}>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Input {...register(`envNames.${index}`)} />
                  <Button type={"button"} variant="ghost" size="icon" onClick={() => remove(index)}>
                    <Trash className={"text-destructive"} size={16} />
                  </Button>
                </div>
              ))}
              <Button type={"button"} variant={"outline"} size="icon" onClick={() => append("")} className={"self-end"}>
                <Plus size={16} />
              </Button>
            </div>
          </div>
          <DialogFooter className={"items-center"}>
            {error && <span className="text-destructive">{error}</span>}
            <Button type="submit">Create project</Button>
          </DialogFooter>
        </fieldset>
      </Form>
    </DialogContent>
  );
};
