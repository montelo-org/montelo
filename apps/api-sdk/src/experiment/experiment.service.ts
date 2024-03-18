import { DatabaseService } from "@montelo/api-common";
import { Experiment } from "@montelo/db";
import { Injectable, Logger } from "@nestjs/common";
import { CreateExperimentParams, CreateRunParams } from "./experiment.service.types";


@Injectable()
export class ExperimentService {
  private logger = new Logger(ExperimentService.name);

  constructor(private db: DatabaseService) {}

  async create(params: CreateExperimentParams): Promise<Experiment> {
    return this.db.experiment.create({
      data: params,
    });
  }

  async createRun(params: CreateRunParams) {
    return this.db.experimentRun.create({
      data: params,
    });
  }
}
