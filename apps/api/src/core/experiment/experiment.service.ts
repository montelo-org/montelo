import { DatabaseService } from "@montelo/api-common";
import { Experiment } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { FullExperiment } from "./experiment.types";


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

  async getExperimentsForEnvironment(envId: string): Promise<Experiment[]> {
    return this.db.experiment.findMany({
      where: {
        dataset: {
          envId,
        },
      },
    });
  }

  async getFullExperiment(experimentId: string): Promise<FullExperiment> {
    return this.db.experiment.findUniqueOrThrow({
      where: {
        id: experimentId,
      },
      include: {
        dataset: true,
        datapointRuns: true,
      },
    });
  }
}
