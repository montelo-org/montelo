import { Datapoint } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@montelo/api-common";


@Injectable()
export class DatapointService {
  constructor(private db: DatabaseService) {}

  async getAllForDataset(datasetId: string): Promise<Datapoint[]> {
    return this.db.datapoint.findMany({
      where: {
        datasetId,
      },
    });
  }
}
