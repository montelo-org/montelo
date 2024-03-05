import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { createClerkClient, User } from "@clerk/remix/api.server";
import { withAuth } from "../../../../../../../common/auth/withAuth";
import { Sidebar } from "../../../../../../../components/nav/sidebar/sidebar";
import { Routes } from "../../../../../../../routes";
import { EnvironmentDto, FullProjectDto } from "@montelo/browser-client";

type EnvLayoutLoader = {
  orgId: string;
  environment: EnvironmentDto;
  user: User;
  project: FullProjectDto;
};

export const loader: LoaderFunction = withAuth(async ({ params, api, userId, orgId }) => {
  if (!orgId) {
    return redirect(Routes.app.root);
  }
  const envId = params.envId!;
  const projectId = params.projectId!;

  const environmentPromise = api.environment().environmentControllerGet({
    envId,
  });

  const projectPromise = api.project().projectControllerGet({
    projectId,
  });

  const userPromise = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }).users.getUser(userId);

  const [environment, project, user] = await Promise.all([environmentPromise, projectPromise, userPromise]);

  return json<EnvLayoutLoader>({ user, environment, project, orgId });
});


export default function DashboardLayout() {
  const { project, environment, orgId } = useLoaderData<EnvLayoutLoader>();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar project={project} environment={environment} orgId={orgId} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto pb-4 px-8 ml-52 mt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}