import { ActionFunction, json } from "@remix-run/node";

import { withAuth } from "../../../common/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const formData = await request.formData();
  const projectId = formData.get("projectId")!.toString();

  await api.project().projectControllerDelete({
    projectId,
  });

  return json({});
});
