import { Prisma } from "@montelo/db";


export type CreateExperimentParams = {
  datasetId: string;
  name: string;
  description: string | null;
}

export type CreateRunParams = {
  experimentId: string;
  input: Record<string, any>;
  output: Record<string, any>;
}

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
