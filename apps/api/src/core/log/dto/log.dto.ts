// TODO add this and the log.dto from api-sdk to the api-common package
import { Log, LogSources } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { omit } from "lodash";

export class LogDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  traceId: string;

  @ApiProperty()
  @IsString()
  envId: string;

  @ApiProperty()
  parentLogId: string | null;

  @ApiProperty()
  name: string | null;

  @ApiProperty({ enum: LogSources })
  source: LogSources;

  @ApiProperty()
  @IsString()
  model: string | null;

  @ApiProperty()
  input: any;

  @ApiProperty()
  output: any;

  @ApiProperty()
  startTime: string | null;

  @ApiProperty()
  endTime: string | null;

  @ApiProperty()
  duration: number | null;

  @ApiProperty()
  inputTokens: number | null;

  @ApiProperty()
  outputTokens: number | null;

  @ApiProperty()
  totalTokens: number | null;

  @ApiProperty()
  inputCost: number | null;

  @ApiProperty()
  outputCost: number | null;

  @ApiProperty()
  totalCost: number | null;

  @ApiProperty()
  extra: any;

  @ApiProperty()
  createdAt: string;

  static fromLog(log: Log): LogDto {
    const baseLog = omit(log, ["startTime", "endTime", "updatedAt"]);

    return {
      ...baseLog,
      model: log.model || null,
      startTime: log.startTime?.toISOString() || null,
      endTime: log.endTime?.toISOString() || null,
      parentLogId: baseLog.parentLogId || null,
      createdAt: log.createdAt.toISOString(),
    };
  }
}
