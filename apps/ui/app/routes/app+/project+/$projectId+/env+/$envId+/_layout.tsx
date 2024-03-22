import { getAuth } from "@clerk/remix/ssr.server";
import { Configuration } from "@montelo/browser-client";
import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Api } from "~/api";
import { PageBreadcrumb } from "~/components/nav/header/PageBreadcrumb";
import { Header } from "~/components/nav/sidebar/Header";
import { Sidebar } from "~/components/nav/sidebar/Sidebar";
import { env } from "~/config/environment.server";
import { Routes } from "~/routes";
import { clerkClient } from "~/services/clerk.server";
import { AppLayoutLoader } from "~/types/AppLayoutLoader.types";

export const loader: LoaderFunction = async (args) => {
  const auth = await getAuth(args);
  const token = await auth.getToken();

  if (!token || !auth.userId) {
    return redirect(Routes.auth.login);
  }

  const projectId = args.params.projectId!;

  const configuration = new Configuration({
    basePath: env.SERVER_BASE_URL,
    accessToken: token,
    headers: {
      connection: "keep-alive",
      "x-montelo-project-id": projectId || "",
    },
  });
  const api = new Api(configuration);

  const orgId = auth.orgId;
  const envId = args.params.envId!;

  if (!orgId) {
    throw new Error("Organization ID is missing");
  }

  const environmentPromise = api.environment.environmentControllerGetEnv({
    envId,
  });

  const projectPromise = api.project.projectControllerGetProject();

  const allProjectsForOrgPromise = api.organization.organizationControllerGetProjectsForOrg();

  const [environment, project, allProjects] = await Promise.all([
    environmentPromise,
    projectPromise,
    allProjectsForOrgPromise,
  ]);

  const organization = await clerkClient.organizations.getOrganization({ organizationId: orgId, slug: auth.orgSlug! });

  return json<AppLayoutLoader>({ environment, project, allProjects, org: organization });
};

export default function DashboardLayout() {
  const loaderData = useLoaderData<AppLayoutLoader>();

  return (
    <div className={"grid h-full w-full grid-cols-6 gap-6"}>
      <div className={"col-span-1 flex flex-col gap-4 rounded border-r-2 pr-6"}>
        <Header {...loaderData} />
        <Sidebar project={loaderData.project} />
      </div>
      <main className={"col-span-5"}>
        <div className={"flex flex-col gap-4 "}>
          <PageBreadcrumb {...loaderData} />
          <Outlet />
        </div>
      </main>
    </div>
  );
}
