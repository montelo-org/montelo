import { DeleteSuccessDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import { withAuth } from "~/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const formData = await request.formData();
  const datasetId = formData.get("datasetId")!.toString();
  const success = await api.dataset.datasetControllerDelete({
    datasetId,
  });
  return json<DeleteSuccessDto>(success);
});
