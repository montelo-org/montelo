import { Experiment } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database";
import {
  CreateExperimentParams,
  GetExperimentsOpts,
  PaginatedExperimentWithDatapointRuns,
  PaginatedExperimentWithDatapoints,
  PaginatedExperiments,
} from "./experiment.types";

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
        createdAt: "desc",
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

  async getExperimentWithDatapoints(
    experimentId: string,
    options?: GetExperimentsOpts,
  ): Promise<PaginatedExperimentWithDatapoints> {
    const experiment = await this.db.experiment.findUniqueOrThrow({
      where: {
        id: experimentId,
      },
      include: {
        dataset: {
          include: {
            datapoints: {
              orderBy: {
                createdAt: "desc",
              },
              take: options?.take,
              skip: options?.skip,
            },
          },
        },
      },
    });

    const totalDatapoints = await this.db.datapoint.count({
      where: {
        datasetId: experiment.datasetId,
      },
    });

    return { experiment, totalDatapoints };
  }

  async getExperimentWithDatapointRuns(
    experimentId: string,
    options?: GetExperimentsOpts,
  ): Promise<PaginatedExperimentWithDatapointRuns> {
    const experimentPromise = this.db.experiment.findUniqueOrThrow({
      where: {
        id: experimentId,
      },
      include: {
        dataset: true,
        datapointRuns: {
          include: {
            datapoint: true,
          },
          orderBy: {
            createdAt: "desc",
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

  async createUsingSlug(envId: string, slug: string, params: CreateExperimentParams): Promise<Experiment> {
    return this.db.experiment.create({
      data: {
        ...params,
        dataset: {
          connect: {
            slug_envId: {
              envId,
              slug,
            },
          },
        },
      },
    });
  }
}
