import { getAuth } from "@clerk/remix/ssr.server";
import { Configuration, EnvironmentDto, FullProjectDto } from "@montelo/browser-client";
import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Outlet, ShouldRevalidateFunction, useLoaderData, useLocation } from "@remix-run/react";
import { Api } from "~/api";
import { Header } from "~/components/nav/header/Header";
import { env } from "~/config/environment.server";
import { Routes } from "~/routes";

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

  const environmentPromise = envId
    ? api.environment().environmentControllerGet({
        envId,
      })
    : undefined;

  const projectPromise = projectId
    ? api.project().projectControllerGet({
        projectId,
      })
    : undefined;

  const allProjectsForOrgPromise = orgId
    ? api.project().projectControllerGetAllForOrg({
        orgId,
      })
    : undefined;

  const [environment, project, allProjects] = await Promise.all([
    environmentPromise,
    projectPromise,
    allProjectsForOrgPromise,
  ]);

  return json<AppLayoutLoader>({ environment, project, allProjects });
};

export const shouldRevalidate: ShouldRevalidateFunction = () => true;

export default function AppLayout() {
  const { pathname } = useLocation();
  const { project, environment, allProjects } = useLoaderData<AppLayoutLoader>();

  const shouldHideOrgSwitcher = pathname === Routes.app.root;

  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="bg-background fixed top-0 z-10 flex h-14 w-full items-center px-4 py-2 shadow">
        <Header
          project={project}
          environment={environment}
          allProjects={allProjects}
          hideOrgSwitcher={shouldHideOrgSwitcher}
        />
      </header>
      <main className="mt-14">
        <Outlet />
      </main>
    </div>
  );
}
