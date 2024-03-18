import { DatabaseService } from "@montelo/api-common";
import { Experiment } from "@montelo/db";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ExperimentService {
  constructor(private db: DatabaseService) {}

  async getAllForDataset(datasetId: string): Promise<Experiment[]> {
    return this.db.experiment.findMany({
      where: {
        datasetId,
      },
    });
  }

  async getExperiment(experimentId: string): Promise<Experiment> {
    return this.db.experiment.findUniqueOrThrow({
      where: {
        id: experimentId,
      },
    });
  }
}
