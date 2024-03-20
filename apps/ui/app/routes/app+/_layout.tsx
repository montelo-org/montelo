import { getAuth } from "@clerk/remix/ssr.server";
import { Configuration } from "@montelo/browser-client";
import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Outlet, ShouldRevalidateFunction, useLoaderData } from "@remix-run/react";
import { Api } from "~/api";
import { Header } from "~/components/nav/header/Header";
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

  const projectId = args.params.projectId;

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
  const envId = args.params.envId;

  const environmentPromise = envId
    ? api.environment.environmentControllerGetEnv({
        envId,
      })
    : undefined;

  const projectPromise = projectId ? api.project.projectControllerGetProject() : undefined;

  const allProjectsForOrgPromise = orgId ? api.organization.organizationControllerGetProjectsForOrg() : undefined;

  const [environment, project, allProjects] = await Promise.all([
    environmentPromise,
    projectPromise,
    allProjectsForOrgPromise,
  ]);

  const organization = await clerkClient.organizations.getOrganization({ organizationId: orgId, slug: auth.orgSlug! });

  return json<AppLayoutLoader>({ environment, project, allProjects, org: organization });
};

export const shouldRevalidate: ShouldRevalidateFunction = () => true;

export default function AppLayout() {
  const { project, environment, allProjects, org } = useLoaderData<AppLayoutLoader>();

  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="bg-background fixed top-0 z-10 flex h-14 w-full items-center px-4 shadow">
        <Header org={org} project={project} environment={environment} allProjects={allProjects} />
      </header>
      <main className="mt-16">
        <Outlet />
      </main>
    </div>
  );
}
