import { Prisma } from "@montelo/db";

export type CreateExperimentParams = {
  name: string;
  description: string | null;
};

const experimentWithDatapoints = Prisma.validator<Prisma.ExperimentDefaultArgs>()({
  include: {
    dataset: {
      include: {
        datapoints: true,
      },
    },
  },
});
export type ExperimentWithDatapoints = Prisma.ExperimentGetPayload<typeof experimentWithDatapoints>;
