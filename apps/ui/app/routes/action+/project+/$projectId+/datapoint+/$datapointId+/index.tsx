import { DeleteSuccessDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import { withAuth } from "~/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, params, request }) => {
  if (request.method === "DELETE") {
    const datapointId = params.datapointId!;
    const success = await api.datapoint.datapointControllerDeleteDatapoint({
      datapointId,
    });
    return json<DeleteSuccessDto>(success);
  }

  return json({});
});
