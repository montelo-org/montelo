import { Log, Prisma } from "@montelo/db";
import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../../database";

type FindAllForEnvOpts = {
  take?: number;
  skip?: number;
  cursor?: string;
  sortColumn?: keyof Prisma.LogOrderByWithRelationInput;
  sortDirection?: "asc" | "desc";
};

@Injectable()
export class LogService {
  constructor(private db: DatabaseService) { }

  async findAllForEnv(envId: string, options?: FindAllForEnvOpts): Promise<{ logs: Log[], totalCount: number }> {
    if (!envId) throw new Error("envId is required");

    const orderByOptions = options?.sortColumn && options?.sortDirection ?
      { [options.sortColumn]: options.sortDirection }
      : { startTime: "desc" } as const;

    const logs = await this.db.log.findMany({
      where: {
        envId,
      },
      orderBy: orderByOptions,
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
