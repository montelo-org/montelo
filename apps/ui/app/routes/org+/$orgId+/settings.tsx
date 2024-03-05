import { OrgIdPage } from "../../../pages/home/OrgIdPage";
import { withAuth } from "../../../common/auth/withAuth";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClerkClient, Organization } from "@clerk/remix/api.server";
import { TabValues } from "../../../pages/home/enums";

type LoaderType = {
  organization: Organization;
}

export const loader: LoaderFunction = withAuth(async ({ api, params }) => {
  const orgId = params.orgId!;

  const organization = await createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }).organizations.getOrganization({
    organizationId: orgId,
  });

  return json<LoaderType>({ organization });
});

export default function OrgIdRoute() {
  const { organization } = useLoaderData<LoaderType>();
  return <OrgIdPage activeTab={TabValues.settings} organization={organization} />;
};