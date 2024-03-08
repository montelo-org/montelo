import { FullProjectDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { OrgProjectsPage } from "~/pages/root/OrgProjectsPage";

type LoaderType = {
  orgId: string;
  projects: FullProjectDto[];
};

export const loader: LoaderFunction = withAuth(async ({ api, orgId }) => {
  const projects = await api.project().projectControllerGetAllForOrg({
    orgId,
  });
  return json<LoaderType>({ orgId, projects });
});

export default function OrgProjectsRoute() {
  const { orgId, projects } = useLoaderData<LoaderType>();
  return <OrgProjectsPage orgId={orgId} projects={projects} />;
}
