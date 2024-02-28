import { json, LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { withAuth } from "../../../../../common/auth/withAuth";
import { EnvLayoutLoader } from "../../../../../types/envLayout.loader.types";
import { Sidebar } from "../../../../../components/nav/sidebar/sidebar";

export const loader: LoaderFunction = withAuth(async ({ params, api, user }) => {
  const envId = params.envId!;
  const projectId = params.projectId!;

  const environmentPromise = api.environment().environmentControllerGet({
    envId,
  });

  const projectPromise = api.project().projectControllerGet({
    projectId,
  });

  const [environment, project] = await Promise.all([environmentPromise, projectPromise]);

  return json<EnvLayoutLoader>({ user, environment, project });
});


export default function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto pb-4 px-8 ml-52 mt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}