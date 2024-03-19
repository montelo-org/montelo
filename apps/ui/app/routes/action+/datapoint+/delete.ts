import { DeleteSuccessDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import { withAuth } from "~/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const formData = await request.formData();
  const datasetId = formData.get("datasetId")!.toString();
  const datapointId = formData.get("datapointId")!.toString();
  const success = await api.datapoint.datapointControllerRemoveFromDataset({
    datasetId,
    datapointId,
  });
  return json<DeleteSuccessDto>(success);
});
