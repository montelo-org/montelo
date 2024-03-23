import { DatabaseService } from "@montelo/api-common";
import { Log, Prisma } from "@montelo/db";
import { Injectable } from "@nestjs/common";

type FindAllForEnvOpts = {
  take?: number;
  skip?: number;
  cursor?: string;
  sortColumn?: keyof Prisma.LogOrderByWithAggregationInput;
  sortDirection?: "asc" | "desc";
  searchQuery?: string;
  startDate?: string;
};

@Injectable()
export class LogService {
  constructor(private db: DatabaseService) {}

  async findAllForEnv(envId: string, options?: FindAllForEnvOpts): Promise<{ logs: Log[]; totalCount: number }> {
    const whereQuery: Prisma.LogWhereInput = {
      envId,
      trace: {
        datapointRunId: null
      },
      ...(options?.searchQuery && {
        OR: [
          {
            name: { contains: options.searchQuery, mode: "insensitive" },
          },
          // this no work
          // {
          //   input: { string_contains: options.searchQuery },
          // },
          // {
          //   output: { string_contains: options.searchQuery },
          // },
        ],
      }),
      ...(options?.startDate && {
        startTime: { gte: new Date(options.startDate) },
      }),
    };

    const orderByOptions: Prisma.LogOrderByWithRelationAndSearchRelevanceInput =
      options?.sortColumn && options?.sortDirection
        ? { [options.sortColumn]: options.sortDirection }
        : ({ startTime: "desc" } as const);

    const logs = await this.db.log.findMany({
      where: whereQuery,
      orderBy: orderByOptions,
      take: options?.take || 50,
      skip: options?.skip || 0,
      cursor: options?.cursor ? { id: options.cursor } : undefined,
    });

    // Get the total count of logs for the given envId
    const totalCount = await this.db.log.count({ where: whereQuery });

    return { logs, totalCount };
  }
}
