import { DatasetDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { withAuth } from "~/auth/withAuth";
import { createDatasetValidator } from "~/pages/datasets/forms/createDatasetValidator";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const formData = await request.json();
  const validated = await createDatasetValidator.validate(formData);
  if (validated.error) {
    return validationError(validated.error);
  }

  const formatter = (accum: Record<string, any>, curr: any) => ({ ...accum, [curr.key]: curr.value });

  const formattedInputSchema = validated.data.inputSchema.reduce(formatter, {} as Record<string, any>);
  const formattedOutputSchema = validated.data.outputSchema.reduce(formatter, {} as Record<string, any>);

  const dataset = await api.dataset.datasetControllerCreate({
    createDatasetInput: { ...validated.data, inputSchema: formattedInputSchema, outputSchema: formattedOutputSchema },
  });

  return json<DatasetDto>(dataset);
});
