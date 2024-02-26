import { Trace } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { omit } from "lodash";

export class TraceDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  envId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  inputTokens: number;

  @ApiProperty()
  outputTokens: number;

  @ApiProperty()
  totalTokens: number;

  @ApiProperty()
  inputCost: number;

  @ApiProperty()
  outputCost: number;

  @ApiProperty()
  totalCost: number;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  userId: string | null;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  extra: any;

  static fromTrace(trace: Trace): TraceDto {
    const baseTrace = omit(trace, ["createdAt", "updatedAt"]);

    return {
      ...baseTrace,
      startTime: trace.startTime.toISOString(),
      endTime: trace.endTime.toISOString(),
    };
  }
}
