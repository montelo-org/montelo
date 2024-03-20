import { DeleteSuccessDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import { withAuth } from "~/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, params, request }) => {
  console.log("action");
  if (request.method === "DELETE") {
    const datasetId = params.datasetId!;
    const success = await api.dataset.datasetControllerDeleteDataset({
      datasetId,
    });
    return json<DeleteSuccessDto>(success);
  }

  return json({});
});
