import { getAuth } from "@clerk/remix/ssr.server";
import { Configuration } from "@montelo/browser-client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";

import { Api } from "../../api";
import { env } from "../../config/environment.server";
import { Routes } from "../../routes";

export type AuthenticatedFunctionParams = Parameters<LoaderFunction | ActionFunction>[0] & {
  api: Api;
  userId: string;
  orgId: string | undefined;
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

    const configuration = new Configuration({
      basePath: env.SERVER_BASE_URL,
      accessToken: token,
    });
    const api = new Api(configuration);

    return func({ ...args, api, userId: auth.userId, orgId: auth.orgId });
  };
};
