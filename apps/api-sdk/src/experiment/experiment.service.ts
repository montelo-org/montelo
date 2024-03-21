import { DatabaseService } from "@montelo/api-common";
import { Experiment } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { CreateExperimentParams, CreateRunParams, ExperimentWithDatapoints } from "./experiment.service.types";

@Injectable()
export class ExperimentService {
  constructor(private db: DatabaseService) {}

  async getExperimentWithDatapoints(experimentId: string): Promise<ExperimentWithDatapoints> {
    return this.db.experiment.findUniqueOrThrow({
      where: { id: experimentId },
      include: {
        dataset: {
          include: {
            datapoints: true,
          },
        },
      },
    });
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

  async createRun(params: CreateRunParams) {
    return this.db.experimentRun.create({
      data: params,
    });
  }
}
