import { DatasetDto } from "@montelo/browser-client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { withAuth } from "~/auth/withAuth";
import { createDatasetValidator } from "~/pages/datasets/forms/createDatasetValidator";
import { Routes } from "~/routes";

type ActionOutput = {
  dataset?: DatasetDto;
  error?: string;
};

export const action: ActionFunction = withAuth(async ({ api, request, params }) => {
  const envId = params.envId!;

  const formData = await request.formData();
  const validated = await createDatasetValidator.validate(formData);
  if (validated.error) {
    return validationError(validated.error);
  }

  const formatter = (accum: Record<string, any>, curr: any) => ({ ...accum, [curr.key]: curr.value });

  const formattedInputSchema = validated.data.inputSchema.reduce(formatter, {} as Record<string, any>);
  const formattedOutputSchema = validated.data.outputSchema.reduce(formatter, {} as Record<string, any>);

  try {
    const dataset = await api.dataset.datasetControllerCreateDataset({
      envId,
      createDatasetInput: { ...validated.data, inputSchema: formattedInputSchema, outputSchema: formattedOutputSchema },
    });
    return json<ActionOutput>({ dataset });
  } catch (e: any) {
    if (e.response.status === 409) {
      return json<ActionOutput>({ error: "Dataset with this slug already exists" });
    }
    return json<ActionOutput>({ error: "Failed to createProject dataset" });
  }
});

export const loader = withAuth(async ({ params }) => {
  const projectId = params.projectId!;
  const envId = params.envId!;

  return redirect(
    Routes.app.project.env.datasets({
      projectId,
      envId,
    }),
  );
});
