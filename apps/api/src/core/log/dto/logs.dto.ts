import { Log } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { LogDto } from "./log.dto";

export class LogsDto {
  @ApiProperty()
  logs: LogDto[];

  @ApiProperty()
  @IsString()
  totalCount: number;

  static fromLogsWithCount(logsAndCount: { logs: Log[]; totalCount: number }): LogsDto {
    const logs = logsAndCount.logs.map((log) => LogDto.fromLog(log));
    const totalCount = logsAndCount.totalCount;

    return { logs, totalCount };
  }
}
