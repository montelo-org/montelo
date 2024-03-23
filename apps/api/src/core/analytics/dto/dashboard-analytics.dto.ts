import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

class MaxDto {
  @ApiProperty()
  @IsString()
  cost: string;

  @ApiProperty()
  @IsString()
  latency: string;
}

class ChangesDto {
  @ApiProperty()
  @IsString()
  cost: string;

  @ApiProperty()
  @IsString()
  latency: string;

  @ApiProperty()
  @IsString()
  traces: string;
}

export class DashboardAnalyticsDto {
  @ApiProperty()
  @IsString()
  cost: string;

  @ApiProperty()
  @IsString()
  averageLatency: string;

  @ApiProperty()
  @IsString()
  traces: string;

  @ApiProperty({ type: MaxDto })
  max: MaxDto;

  @ApiProperty({ type: ChangesDto })
  changes: ChangesDto;

  @ApiProperty()
  experimentCount: number;
}
