import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../../database";
import { TraceWithLogs } from "./trace.types";

@Injectable()
export class TraceService {
  constructor(private db: DatabaseService) {}

  async getById(traceId: string): Promise<TraceWithLogs> {
    return this.db.trace.findUniqueOrThrow({
      where: {
        id: traceId,
      },
      include: {
        logs: {
          orderBy: {
            startTime: "asc",
          },
        },
      },
    });
  }

  async delete(traceId: string): Promise<void> {
    await this.db.trace.delete({
      where: {
        id: traceId,
      },
    });
  }
}
