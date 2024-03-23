import { Prisma } from "@montelo/db";


const datapointRunWithExperiment = Prisma.validator<Prisma.DatapointRunDefaultArgs>()({
  include: {
    experiment: true,
  },
});
export type DatapointRunWithExperiment = Prisma.DatapointRunGetPayload<typeof datapointRunWithExperiment>;
