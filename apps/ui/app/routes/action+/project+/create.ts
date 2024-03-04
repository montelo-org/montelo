import { ProjectDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import _ from "lodash";

import { withAuth } from "../../../common/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  const formData = await request.formData();
  const name = formData.get("name")!.toString();
  const teamId = formData.get("teamId")!.toString();

  const environments = formData.getAll("environments") as string[];
  const formattedEnvs = environments.map((env) => _.capitalize(env.toString()));

  console.log("formattedEnvs: ", formattedEnvs);
  const project = await api.project().projectControllerCreate({
    createProjectInput: {
      name,
      teamId,
      envNames: formattedEnvs.length > 0 ? formattedEnvs : [],
    },
  });
  return json<ProjectDto>(project);
});
