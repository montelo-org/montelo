import { ProjectDto } from "@montelo/browser-client";
import { ActionFunction, json } from "@remix-run/node";
import _ from "lodash";
import { withAuth } from "~/auth/withAuth";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  // createProject project
  if (request.method === "POST") {
    const formData = await request.formData();
    const name = formData.get("name")!.toString();

    const environments = formData.getAll("environments") as string[];
    const formattedEnvs = environments.map((env) => _.capitalize(env.toString())).filter((env) => env.length);

    const project = await api.organization.organizationControllerCreateProject({
      createProjectInput: {
        name,
        envNames: formattedEnvs.length ? formattedEnvs : [],
      },
    });
    return json<ProjectDto>(project);
  }
  return json({});
});
