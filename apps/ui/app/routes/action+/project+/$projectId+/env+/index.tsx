import { EnvironmentDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import { withAuth } from "~/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const formData = await request.formData();
  const envName = formData.get("envName")!.toString();

  const environment = await api.environment.environmentControllerCreateEnv({
    createEnvInput: {
      name: envName,
    },
  });

  return json<EnvironmentDto>(environment);
});
