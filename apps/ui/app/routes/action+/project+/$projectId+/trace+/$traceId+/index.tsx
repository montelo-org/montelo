import { DeleteSuccessDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import { withAuth } from "~/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request, params }) => {
  if (request.method === "DELETE") {
    const traceId = params.traceId!;
    const success = await api.trace.traceControllerDeleteTrace({
      traceId,
    });
    return json<DeleteSuccessDto>(success);
  }

  return json({});
});
