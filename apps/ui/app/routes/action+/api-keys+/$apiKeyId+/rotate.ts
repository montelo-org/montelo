import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import { withAuth } from "../../../../auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, params }) => {
  const apiKeyId = params.apiKeyId!;
  const apiKey = await api.apiKey().apiKeyControllerRotate({
    apiKeyId,
  });
  return json<ApiKeyWithEnvDto>(apiKey);
});
