import { DeleteSuccessDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";

import { withAuth } from "../../../common/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const formData = await request.formData();
  const traceId = formData.get("traceId")!.toString();
  const success = await api.trace().traceControllerDelete({
    traceId,
  });
  return json<DeleteSuccessDto>(success);
});
