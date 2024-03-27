import { getAuth } from "@clerk/remix/ssr.server";
import { Configuration } from "@montelo/browser-client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Api } from "~/api";
import { env } from "~/config/environment.server";
import { Routes } from "~/routes";

export type AuthenticatedFunctionParams = Parameters<LoaderFunction | ActionFunction>[0] & {
  api: Api;
  userId: string;
  orgId?: string;
};

export type AuthenticatedFunction = (
  params: AuthenticatedFunctionParams,
) => ReturnType<LoaderFunction | ActionFunction>;

export const withAuth = (func: AuthenticatedFunction): LoaderFunction | ActionFunction => {
  return async (args) => {
    const auth = await getAuth(args);
    const token = await auth.getToken();

    if (!token || !auth.userId) {
      return redirect(Routes.auth.login);
    }

    const { userId, orgId } = auth;
    if (!orgId && !userId) {
      console.warn("No orgId or userId found in session.");
      return redirect(Routes.app.root);
    }

    const configuration = new Configuration({
      basePath: env.SERVER_BASE_URL,
      accessToken: token,
      headers: {
        connection: "keep-alive",
        "x-montelo-project-id": args.params.projectId || "",
      },
    });
    const api = new Api(configuration);

    return func({ ...args, api, userId: auth.userId, orgId });
  };
};
