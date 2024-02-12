import { ProjectDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import _ from "lodash";

import { withAuth } from "../../../common/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const formData = await request.formData();
  const name = formData.get("name")!.toString();
  const teamId = formData.get("teamId")!.toString();
  const environment = formData.get("environment");

  const project = await api.project().projectControllerCreate({
    createProjectInput: {
      name,
      teamId,
      envNames: environment ? [_.capitalize(environment.toString())] : [],
    },
  });
  return json<ProjectDto>(project);
});
