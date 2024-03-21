import { FullProjectDto } from "@montelo/browser-client";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withAuth } from "~/auth/withAuth";
import { OrgProjectsPage } from "~/pages/root/OrgProjectsPage";

type LoaderType = {
  projects: FullProjectDto[];
};

export const loader: LoaderFunction = withAuth(async ({ api }) => {
  const projects = await api.organization.organizationControllerGetProjectsForOrg();
  return json<LoaderType>({ projects });
});

export default function OrgProjectsRoute() {
  const { projects } = useLoaderData<LoaderType>();
  return <OrgProjectsPage projects={projects} />;
}
