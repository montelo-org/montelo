import { DatabaseService } from "@montelo/api-common";
import { Injectable } from "@nestjs/common";
import { TraceWithLogs } from "../trace/trace.types";
import { DatapointRunWithExperiment } from "./datapointRun.types";


@Injectable()
export class DatapointRunService {
  constructor(private db: DatabaseService) {}

  async getDatapointRunWithExperiment(datapointRunId: string): Promise<DatapointRunWithExperiment> {
    return this.db.datapointRun.findUniqueOrThrow({
      where: {
        id: datapointRunId,
      },
      include: {
        experiment: true,
      },
    });
  }

  async getDatapointRunTrace(datapointRunId: string): Promise<TraceWithLogs> {
    return this.db.trace.findUniqueOrThrow({
      where: {
        datapointRunId,
      },
      include: {
        logs: {
          orderBy: [
            {
              startTime: "asc",
            },
          ],
        },
      },
    });
  }
}
