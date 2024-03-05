import { OrgIdPage } from "../../../pages/home/OrgIdPage";
import { withAuth } from "../../../common/auth/withAuth";
import { json, LoaderFunction } from "@remix-run/node";
import { FullProjectDto } from "@montelo/browser-client";
import { useLoaderData } from "@remix-run/react";
import { createClerkClient, Organization } from "@clerk/remix/api.server";
import { TabValues } from "../../../pages/home/enums";

type LoaderType = {
  organization: Organization;
  projects: FullProjectDto[];
}

export const loader: LoaderFunction = withAuth(async ({ api, params }) => {
  const orgId = params.orgId!;

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