import { DatabaseService } from "@montelo/api-common";
import { Prisma } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { createId } from "@paralleldrive/cuid2";
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
          orderBy: [
            {
              startTime: "asc",
            },
          ],
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

  async createDefaultTrace(envId: string) {
    const firstLogId = createId();
    const secondLogId = createId();
    const thirdLogId = createId();

    const firstLog: Prisma.LogCreateManyTraceInput = {
      id: firstLogId,
      envId,
      source: "MANUAL",
    };

    const secondLog: Prisma.LogCreateManyTraceInput = {
      id: secondLogId,
      parentLogId: firstLogId,
      envId,
      source: "OPENAI",
    };

    const thirdLog: Prisma.LogCreateManyTraceInput = {
      id: thirdLogId,
      parentLogId: secondLogId,
      envId,
      source: "ANTHROPIC",
    };

    await this.db.trace.create({
      data: {
        envId,
        name: "Sample Trace",
        startTime: "2024-03-24T04:00:41.836Z",
        endTime: "2024-03-24T04:01:41.836Z",
        duration: 60,
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        inputCost: 0,
        outputCost: 0,
        totalCost: 0,
        createdAt: "2024-03-24T04:00:41.836Z",
        updatedAt: "2024-03-24T04:01:41.836Z",
        extra: {
          some: "extra data",
        },
        userId: "user_123",
        tags: ["tag1"],
        logs: {
          createMany: {
            data: [firstLog, secondLog, thirdLog],
          },
        },
      },
    });
  }
}
