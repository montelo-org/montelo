import { Experiment, Prisma } from "@montelo/db";

export type GetExperimentsOpts = {
  take?: number;
  skip?: number;
};

const fullExperiment = Prisma.validator<Prisma.ExperimentDefaultArgs>()({
  include: {
    dataset: true,
    datapointRuns: true,
  },
});
export type FullExperiment = Prisma.ExperimentGetPayload<typeof fullExperiment>;

export type PaginatedExperiments = {
  experiments: Experiment[];
  totalCount: number;
};

export type PaginatedFullExperiment = {
  experiment: FullExperiment;
  totalDatapointRuns: number;
};
