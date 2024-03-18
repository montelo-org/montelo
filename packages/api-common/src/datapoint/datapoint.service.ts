import { Datapoint } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database";
import { AddToDatasetParams } from "./types";


@Injectable()
export class DatapointService {
  constructor(private db: DatabaseService) {}

  async addToDatasetBySlug(envId: string, slug: string, params: AddToDatasetParams): Promise<Datapoint> {
    return this.db.datapoint.create({
      data: {
        ...params,
        dataset: {
          connect: {
            slug_envId: {
              slug,
              envId,
            },
          },
        },
      },
    });
  }

  async addToDatasetById(datasetId: string, params: AddToDatasetParams): Promise<Datapoint> {
    return this.db.datapoint.create({
      data: {
        datasetId,
        ...params,
      },
    });
  }

  async getAllForDataset(datasetId: string): Promise<Datapoint[]> {
    return this.db.datapoint.findMany({
      where: {
        datasetId,
      },
    });
  }

  async delete(datapointId: string): Promise<void> {
    await this.db.datapoint.delete({
      where: {
        id: datapointId,
      },
    });
  }
}
