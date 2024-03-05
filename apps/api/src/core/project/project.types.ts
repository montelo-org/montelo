import { Prisma } from "@montelo/db";

export type CreateProjectInput = {
  name: string;
  orgId: string;
  envNames: string[];
};

const projectWithEnvironments = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: {
    environments: true,
  },
});
export type ProjectWithEnvironments = Prisma.ProjectGetPayload<typeof projectWithEnvironments>;

const fullProject = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: {
    environments: true,
  },
});
export type FullProject = Prisma.ProjectGetPayload<typeof fullProject>;
