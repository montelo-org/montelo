import { json, LoaderFunction, redirect } from "@remix-run/node";
import { FullProjectDto } from "@montelo/browser-client";
import { useLoaderData } from "@remix-run/react";
import { createClerkClient, Organization } from "@clerk/remix/api.server";
import { withAuth } from "../../common/auth/withAuth";
import { Routes } from "../../routes";
import { OrgIdPage } from "../../pages/home/OrgIdPage";
import { TabValues } from "../../pages/home/enums";

type LoaderType = {
  organization: Organization;
  projects: FullProjectDto[];
}

export const loader: LoaderFunction = withAuth(async ({ api, orgId }) => {
  if (!orgId) {
    return redirect(Routes.app.root);
  }
  const organizationPromise = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }).organizations.getOrganization({
    organizationId: orgId,
  });

  const projectsPromise = api.project().projectControllerGetAllForOrg({
    orgId,
  });

  const [organization, projects] = await Promise.all([organizationPromise, projectsPromise]);

  return json<LoaderType>({ organization, projects });
});

export default function OrgIdRoute() {
  const { organization, projects } = useLoaderData<LoaderType>();
  return <OrgIdPage activeTab={TabValues.projects} organization={organization} projects={projects} />;
};