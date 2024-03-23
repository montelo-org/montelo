import { DatabaseService } from "@montelo/api-common";
import { Injectable } from "@nestjs/common";
import { CreateRunParams } from "./datapointRun.service.types";
import { DatapointRun } from "@montelo/db";


@Injectable()
export class DatapointRunService {
  constructor(private db: DatabaseService) {}

  async createRun(params: CreateRunParams): Promise<DatapointRun> {
    return this.db.datapointRun.create({
      data: params,
    });
  }

  async updateRun(datapointRunId: string, output: any) {
    return this.db.datapointRun.update({
      where: {
        id: datapointRunId,
      },
      data: {
        output,
      }
    });
  }
}
