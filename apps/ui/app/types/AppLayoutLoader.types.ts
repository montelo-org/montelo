import { Organization, OrganizationMembership, User } from "@clerk/remix/api.server";
import { EnvironmentDto, FullProjectDto } from "@montelo/browser-client";


export type AppLayoutLoader = {
  environment: EnvironmentDto;
  project: FullProjectDto;
  allProjects: FullProjectDto[];
  org: Organization;
  user: User;
  orgMemberships: OrganizationMembership[];
};
