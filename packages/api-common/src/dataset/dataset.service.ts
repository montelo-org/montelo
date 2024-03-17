import { Dataset, Prisma } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database";
import { CreateDatasetParams, DatasetWithDatapoints } from "./dataset.types";


@Injectable()
export class DatasetService {
  constructor(private db: DatabaseService) {}

  async getAllDatasets(envId: string): Promise<Dataset[]> {
    return this.db.dataset.findMany({
      where: {
        envId,
      },
    });
  }

  async getFullDatasetById(datasetId: string): Promise<DatasetWithDatapoints> {
    return this.db.dataset.findUniqueOrThrow({
      where: {
        id: datasetId,
      },
      include: {
        datapoints: true,
      },
    });
  }

  async getByName(params: Prisma.DatasetApiNameEnvIdCompoundUniqueInput): Promise<Dataset> {
    return this.db.dataset.findUniqueOrThrow({
      where: {
        apiName_envId: params,
      },
    });
  }

  async create(params: CreateDatasetParams): Promise<Dataset> {
    const apiName = params.name.replace(/\W+/g, "-").toLowerCase();
    return this.db.dataset.create({
      data: { ...params, apiName },
    });
  }

  async delete(datasetId: string): Promise<void> {
    await this.db.dataset.delete({
      where: {
        id: datasetId,
      },
    });
  }
}
