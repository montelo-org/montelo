import { Prisma } from "@montelo/db";
import { LogInput, TraceInput } from "./dto/create-log.input";

export enum Queues {
  logs = "logs",
}

export type QLogsInput = {
  envId: string;
  trace?: TraceInput;
  log: LogInput;
};

const traceWithLogs = Prisma.validator<Prisma.TraceDefaultArgs>()({
  include: {
    logs: true,
  },
});
export type TraceWithLogs = Prisma.TraceGetPayload<typeof traceWithLogs>;
