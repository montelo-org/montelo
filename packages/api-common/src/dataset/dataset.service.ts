import { Dataset, Prisma } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@montelo/api-common";
import { CreateDatasetParams } from "./dataset.types";


@Injectable()
export class DatasetService {
  constructor(private db: DatabaseService) {}

  async getDatasetById(datasetId: string): Promise<Dataset> {
    return this.db.dataset.findUniqueOrThrow({
      where: {
        id: datasetId,
      },
    });
  }

  async getDatasetByName(params: Prisma.DatasetApiNameEnvIdCompoundUniqueInput): Promise<Dataset> {
    return this.db.dataset.findUniqueOrThrow({
      where: {
        apiName_envId: params,
      },
    });
  }

  async createDataset(params: CreateDatasetParams): Promise<Dataset> {
    const apiName = params.name.replace(/\W+/g, "_").toLowerCase();
    return this.db.dataset.create({
      data: { ...params, apiName },
    });
  }
}
