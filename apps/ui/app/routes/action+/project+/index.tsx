import { ActionFunction, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import { withAuth } from "~/auth/withAuth";
import {
  CreateProjectResolver,
  CreateProjectSchemaType,
} from "~/components/dialogs/CreateProjectDialog/CreateProjectValidator";
import { CreateProjectActionData } from "~/components/dialogs/CreateProjectDialog/types";

export const action: ActionFunction = withAuth(async ({ api, request }) => {
  // create project
  if (request.method === "POST") {
    const {
      errors,
      data,
      receivedValues: defaultValues,
    } = await getValidatedFormData<CreateProjectSchemaType>(request, CreateProjectResolver);
    if (errors) {
      return json({ errors, defaultValues });
    }

    try {
      const project = await api.organization.organizationControllerCreateProject({
        createProjectInput: data,
      });
      return json<CreateProjectActionData>({ project, error: null });
    } catch (e: any) {
      if (e.response.status === 409) {
        return json<CreateProjectActionData>({ project: null, error: "Duplicate names found." });
      }
      return json<CreateProjectActionData>({ project: null, error: "Something went wrong. Try again later." });
    }
  }
  return json({});
});
