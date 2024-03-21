import { ActionFunction, json } from "@remix-run/node";
import { withAuth } from "~/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  if (request.method === "DELETE") {
    await api.project.projectControllerDeleteProject();
    return json({});
  }

  return json({});
});
