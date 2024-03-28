import { ActionFunction, json, redirect } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import { withAuth } from "~/auth/withAuth";
import { CreateDatasetResolver, CreateDatasetSchemaType } from "~/pages/datasets/forms/CreateDatasetValidator";
import { CreateDatasetActionData } from "~/pages/datasets/forms/types";
import { Routes } from "~/routes";

export const action: ActionFunction = withAuth(async ({ api, request, params }) => {
  const envId = params.envId!;

  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<CreateDatasetSchemaType>(request, CreateDatasetResolver);
  if (errors) {
    return json({ errors, defaultValues });
  }

  const formatter = (accum: Record<string, any>, curr: any) => ({ ...accum, [curr.key]: curr.value });

  const formattedInputSchema = data.inputSchema.reduce(formatter, {} as Record<string, any>);
  const formattedOutputSchema = data.outputSchema.reduce(formatter, {} as Record<string, any>);

  try {
    const dataset = await api.dataset.datasetControllerCreateDataset({
      envId,
      createDatasetInput: { ...data, inputSchema: formattedInputSchema, outputSchema: formattedOutputSchema },
    });
    return json<CreateDatasetActionData>({ dataset, error: null });
  } catch (e: any) {
    if (e.response.status === 409) {
      return json<CreateDatasetActionData>({ dataset: null, error: "Dataset with this slug already exists." });
    }
    return json<CreateDatasetActionData>({ dataset: null, error: "Failed to create dataset." });
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
