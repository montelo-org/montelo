import { ActionFunction, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import { withAuth } from "~/auth/withAuth";
import { CreateEnvResolver, CreateEnvSchemaType } from "~/components/dialogs/CreateEnvDialog/CreateEnvValidator";
import { CreateEnvActionData } from "~/components/dialogs/CreateEnvDialog/types";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<CreateEnvSchemaType>(request, CreateEnvResolver);
  if (errors) {
    return json({ errors, defaultValues });
  }

  try {
    const environment = await api.environment.environmentControllerCreateEnv({
      createEnvInput: data,
    });

    return json<CreateEnvActionData>({ environment, error: null });
  } catch (e: any) {
    if (e.response.status === 409) {
      return json<CreateEnvActionData>({ environment: null, error: "Environment name already exists." });
    }
    return json<CreateEnvActionData>({ environment: null, error: "Something went wrong. Try again later." });
  }
});
