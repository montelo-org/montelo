import { Prisma } from "@montelo/db";

const fullProject = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: {
    environments: true,
  },
});
export type FullProject = Prisma.ProjectGetPayload<typeof fullProject>;
