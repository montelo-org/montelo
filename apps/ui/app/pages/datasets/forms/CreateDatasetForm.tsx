import { DatasetDto } from "@montelo/browser-client";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { FetcherWithComponents, useParams } from "@remix-run/react";
import { X } from "lucide-react";
import { FC, FormEvent, useEffect, useState } from "react";
import { ValidatedForm, useField, useFieldArray, useFormContext, useIsSubmitting } from "remix-validated-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { SchemaValueTypes, createDatasetValidator } from "~/pages/datasets/forms/createDatasetValidator";
import { Routes } from "~/routes";

type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
};

export const FormInput: FC<FormInputProps> = ({ name, label, placeholder }) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input {...getInputProps({ id: name, placeholder })} />
      {error && <span className="text-destructive">{error}</span>}
    </div>
  );
};

export const SubmitButton = () => {
  const { isValid } = useFormContext();
  const isSubmitting = useIsSubmitting();
  const disabled = isValid ? isSubmitting : true;

  return (
    <div className={"mt-4 flex justify-end"}>
      <Button type="submit" disabled={disabled}>
        Create Dataset
      </Button>
    </div>
  );
};

type SchemaFieldProps = {
  name: string;
  label: string;
};

export const SchemaField: React.FC<SchemaFieldProps> = ({ name, label }) => {
  const [items, { push, remove }] = useFieldArray(name);

  return (
    <div className={"flex flex-col gap-2"}>
      <Label>{label}</Label>
      {items.map((field, index) => (
        <div key={field.key} className="flex items-center gap-2">
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
        <Button type="button" variant="ghost" onClick={() => push({ key: "", value: "" })}>
          <PlusCircledIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const CreateDatasetForm: FC = () => {
  const params = useParams();

  return (
    <ValidatedForm
      validator={createDatasetValidator}
      method={"post"}
      action={Routes.actions.dataset.create({
        projectId: params.projectId!,
        envId: params.envId!,
      })}
      className={"flex flex-col gap-2"}
      defaultValues={{
        name: "",
        description: "",
        inputSchema: [
          {
            key: "",
          },
        ],
        outputSchema: [
          {
            key: "",
          },
        ],
      }}
    >
      <FormInput name="name" label="Name" />
      <FormInput name="description" label="Description" placeholder={"(Optional)"} />
      <div className={"mt-4 grid grid-cols-2 gap-8"}>
        <SchemaField name="inputSchema" label="Input Schema" />
        <SchemaField name="outputSchema" label="Output Schema" />
      </div>
      <SubmitButton />
    </ValidatedForm>
  );
};
