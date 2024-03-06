import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, ShouldRevalidateFunction, useLoaderData, useLocation } from "@remix-run/react";
import { Configuration, EnvironmentDto, FullProjectDto } from "@montelo/browser-client";
import { Header } from "~/components/nav/header/Header";
import { Routes } from "~/routes";
import { getAuth } from "@clerk/remix/ssr.server";
import { env } from "~/config/environment.server";
import { Api } from "~/api";

export type AppLayoutLoader = {
  environment?: EnvironmentDto;
  project?: FullProjectDto;
  allProjects?: FullProjectDto[];
};

export const loader: LoaderFunction = async (args) => {
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

  const orgId = auth.orgId;
  const envId = args.params.envId;
  const projectId = args.params.projectId;

  const environmentPromise = envId ? api.environment().environmentControllerGet({
    envId,
  }) : undefined;

  const projectPromise = projectId ? api.project().projectControllerGet({
    projectId,
  }) : undefined;

  const allProjectsForOrgPromise = orgId ? api.project().projectControllerGetAllForOrg({
    orgId,
  }) : undefined;

  const [environment, project, allProjects] = await Promise.all([environmentPromise, projectPromise, allProjectsForOrgPromise]);

  return json<AppLayoutLoader>({ environment, project, allProjects });
};

export const shouldRevalidate: ShouldRevalidateFunction = () => true;

export default function AppLayout() {
  const { pathname } = useLocation();
  const { project, environment, allProjects } = useLoaderData<AppLayoutLoader>();

  const shouldHideOrgSwitcher = pathname === Routes.app.root;

  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="fixed top-0 w-full h-14 z-10 px-4 py-2 bg-background shadow">
        <Header project={project} environment={environment} allProjects={allProjects} hideOrgSwitcher={shouldHideOrgSwitcher} />
      </header>
      <main className="flex mt-14 h-full">
        <Outlet />
      </main>
    </div>
  );
}
