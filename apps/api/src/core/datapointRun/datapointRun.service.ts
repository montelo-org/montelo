import { DatabaseService } from "@montelo/api-common";
import { Injectable } from "@nestjs/common";
import { TraceWithLogs } from "../trace/trace.types";


@Injectable()
export class DatapointRunService {
  constructor(private db: DatabaseService) {}

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
