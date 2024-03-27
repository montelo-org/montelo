import { Environment, Project } from "@montelo/db";

export type CreateProjectInput = {
  name: string;
  envNames: string[];
};

export type CreateProjectParams = {
  orgId?: string;
  userId?: string;
  params: CreateProjectInput;
};

export type CreateProjectResponse = { project: Project; environments: Environment[] };
