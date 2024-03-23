import { Prisma } from "@montelo/db";

export type FullDatasetByIdOpts = {
  take?: number;
  skip?: number;
};

export type ExperimentsByIdOpts = {
  take?: number;
  skip?: number;
};

export type CreateDatasetParams = {
  name: string;
  description: string | null;
  envId: string;
  inputSchema: any;
  outputSchema: any;
};

const datasetWithDatapoints = Prisma.validator<Prisma.DatasetDefaultArgs>()({
  include: {
    datapoints: true,
  },
});
export type DatasetWithDatapoints = Prisma.DatasetGetPayload<typeof datasetWithDatapoints>;
