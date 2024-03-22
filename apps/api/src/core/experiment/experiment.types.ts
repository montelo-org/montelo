import { Prisma } from "@montelo/db";

const fullExperiment = Prisma.validator<Prisma.ExperimentDefaultArgs>()({
  include: {
    dataset: true,
    datapointRuns: true
  },
});
export type FullExperiment = Prisma.ExperimentGetPayload<typeof fullExperiment>;