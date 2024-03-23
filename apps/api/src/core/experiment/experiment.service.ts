import { DatabaseService } from "@montelo/api-common";
import { Experiment } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { GetExperimentsOpts, PaginatedExperiments, PaginatedFullExperiment } from "./experiment.types";


@Injectable()
export class ExperimentService {
  constructor(private db: DatabaseService) {}

  async getExperimentsForDataset(datasetId: string): Promise<Experiment[]> {
    return this.db.experiment.findMany({
      where: {
        datasetId,
      },
    });
  }

  async getExperimentsForEnvironment(envId: string, options?: GetExperimentsOpts): Promise<PaginatedExperiments> {
    const experimentsPromise = this.db.experiment.findMany({
      where: {
        dataset: {
          envId,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      take: options?.take,
      skip: options?.skip,
    });

    const totalCountPromise = this.db.experiment.count({
      where: {
        dataset: {
          envId,
        },
      },
    });

    const [experiments, totalCount] = await Promise.all([experimentsPromise, totalCountPromise]);
    return { experiments, totalCount };
  }

  async getFullExperiment(experimentId: string, options?: GetExperimentsOpts): Promise<PaginatedFullExperiment> {
    const experimentPromise = this.db.experiment.findUniqueOrThrow({
      where: {
        id: experimentId,
      },
      include: {
        dataset: true,
        datapointRuns: {
          orderBy: {
            createdAt: "asc",
          },
          take: options?.take,
          skip: options?.skip,
        },
      },
    });

    const totalDatapointRunsPromise = this.db.datapointRun.count({
      where: {
        experimentId,
      },
    });

    const [experiment, totalDatapointRuns] = await Promise.all([experimentPromise, totalDatapointRunsPromise]);

    return { experiment, totalDatapointRuns };
  }
}
