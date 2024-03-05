import { Log } from "@montelo/db";
import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../../database";


@Injectable()
export class LogService {
  constructor(private db: DatabaseService) { }

  async findAllForEnv(envId: string, options?: { take?: number, skip?: number, cursor?: string }): Promise<{ logs: Log[], totalCount: number }> {
    const logs = await this.db.log.findMany({
      where: {
        envId,
      },
      orderBy: [
        {
          startTime: "desc",
        },
      ],
      take: options?.take || 50,
      skip: options?.skip || 0,
      cursor: options?.cursor ? { id: options.cursor } : undefined,
    });

    // Get the total count of logs for the given envId
    const totalCount = await this.db.log.count({
      where: {
        envId,
      },
    });

    return { logs, totalCount };
  }
}
