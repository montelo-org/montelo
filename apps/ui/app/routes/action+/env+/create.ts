import { EnvironmentDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import { withAuth } from "~/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const formData = await request.formData();
  const envName = formData.get("envName")!.toString();
  const projectId = formData.get("projectId")!.toString();

  const environment = await api.environment.environmentControllerCreate({
    createEnvInput: {
      projectId,
      name: envName,
    },
  });

  return json<EnvironmentDto>(environment);
});
