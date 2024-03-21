import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { withAuth } from "~/auth/withAuth";

export const loader: LoaderFunction = withAuth(async ({ api, params }) => {
  const apiKeyDtos = await api.apiKey.apiKeyControllerGetApiKeysForProject();
  return json<ApiKeyWithEnvDto[]>(apiKeyDtos);
});
