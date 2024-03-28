import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Form, useFetcher, useParams } from "@remix-run/react";
import { X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { useRemixForm } from "remix-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import {
  CreateDatasetResolver,
  CreateDatasetSchemaType,
  SchemaValueTypes,
} from "~/pages/datasets/forms/CreateDatasetValidator";
import { CreateDatasetActionData } from "~/pages/datasets/forms/types";
import { Routes } from "~/routes";

type SchemaFieldProps = {
  control: Control<CreateDatasetSchemaType>;
  name: string;
  label: string;
};

export const SchemaField: FC<SchemaFieldProps> = ({ control, name, label }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as never,
  });

  return (
    <div className={"flex flex-col gap-2"}>
      <Label>{label}</Label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <Input name={`${name}[${index}].key`} placeholder="Key" />
          <Select name={`${name}[${index}].value`}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(SchemaValueTypes.enum).map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {index !== 0 && (
            <Button type="button" variant={"ghost"} onClick={() => remove(index)}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <div className={"flex justify-end"}>
        <Button type="button" variant="ghost" onClick={() => append({ key: "", value: "" })}>
          <PlusCircledIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const CreateDatasetForm: FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const fetcher = useFetcher<CreateDatasetActionData>();
  const params = useParams();
  const [error, setError] = useState<string | null>(null);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    control,
    reset,
    watch,
  } = useRemixForm<CreateDatasetSchemaType>({
    mode: "onSubmit",
    resolver: CreateDatasetResolver,
    fetcher,
    submitConfig: {
      method: "post",
      action: Routes.actions.dataset.create({
        projectId: params.projectId!,
        envId: params.envId!,
      }),
    },
  });

  console.log(watch());

  const checkIfSuccessful = () => {
    if (!fetcher.data) {
      return;
    } else if (fetcher.data.error) {
      setError(fetcher.data.error);
    } else if (fetcher.data.dataset) {
      setError(null);
      reset();
      onClose();
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
    <Form onSubmit={handleSubmit} className={"flex flex-col gap-2"}>
      <fieldset disabled={isSubmitting}>
        <div>
          <Label htmlFor={"name"}>Name</Label>
          <Input {...register("name")} />
          {errors.name && <p className="text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor={"description"}>Description</Label>
          <Input {...register("description")} />
          {errors.description && <p className="text-destructive">{errors.description.message}</p>}
        </div>
        <div className={"mt-4 grid grid-cols-2 gap-8"}>
          <SchemaField control={control} name="inputSchema" label="Input Schema" />
          <SchemaField control={control} name="outputSchema" label="Output Schema" />
        </div>
        <div className={"mt-4 flex justify-end"}>
          {error && <p className="text-destructive">{error}</p>}
          <Button type="submit">Create Dataset</Button>
        </div>
      </fieldset>
    </Form>
  );
};
