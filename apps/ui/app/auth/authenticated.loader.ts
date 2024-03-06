import { getAuth } from "@clerk/remix/ssr.server";
import { LoaderFunction, redirect } from "@remix-run/node";

import { Routes } from "../routes";

export const authenticatedLoader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);

  return userId ? redirect(Routes.app.root) : {};
};
