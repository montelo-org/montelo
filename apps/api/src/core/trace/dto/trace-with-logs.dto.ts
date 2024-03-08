import { ApiProperty } from "@nestjs/swagger";
import { LogDto } from "../../log/dto/log.dto";
import { TraceWithLogs } from "../trace.types";
import { TraceDto } from "./trace.dto";

export class TraceWithLogsDto extends TraceDto {
  @ApiProperty()
  logs: LogDto[];

  static fromTraceWithLogs(traceWithLogs: TraceWithLogs): TraceWithLogsDto {
    const traceDto = TraceDto.fromTrace(traceWithLogs);
    const logs = traceWithLogs.logs.map(LogDto.fromLog);

    return {
      ...traceDto,
      logs,
    };
  }
}
