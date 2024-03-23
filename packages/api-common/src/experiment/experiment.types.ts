import { Experiment, Prisma } from "@montelo/db";

const datapointRunWithDatapoint = Prisma.validator<Prisma.DatapointRunDefaultArgs>()({
  include: {
    datapoint: true,
  },
});

export type DatapointRunWithDatapoint = Prisma.DatapointRunGetPayload<typeof datapointRunWithDatapoint>;

export type GetExperimentsOpts = {
  take?: number;
  skip?: number;
};

const experimentWithDatapointRuns = Prisma.validator<Prisma.ExperimentDefaultArgs>()({
  include: {
    dataset: true,
    datapointRuns: {
      include: {
        datapoint: true,
      },
    },
  },
});
export type ExperimentWithDatapointRuns = Prisma.ExperimentGetPayload<typeof experimentWithDatapointRuns>;

export type PaginatedExperimentWithDatapointRuns = {
  experiment: ExperimentWithDatapointRuns;
  totalDatapointRuns: number;
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

export type PaginatedExperimentWithDatapoints = {
  experiment: ExperimentWithDatapoints;
  totalDatapoints: number;
};

export type PaginatedExperiments = {
  experiments: Experiment[];
  totalCount: number;
};

export type CreateExperimentParams = {
  name: string;
  description: string | null;
};
