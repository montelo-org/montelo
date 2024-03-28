export type CreateProjectInput = {
  name: string;
  envNames: string[];
};

export type CreateProjectParams = {
  orgId?: string;
  userId?: string;
  params: CreateProjectInput;
};

