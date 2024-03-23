import { DatapointRun } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { pick } from "lodash";

export class DatapointRunDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  experimentId: string;

  @ApiProperty()
  @IsString()
  datapointId: string;

  @ApiProperty()
  output: any;

  static fromDatapointRun(datapointRun: DatapointRun): DatapointRunDto {
    return pick(datapointRun, ["id", "experimentId", "datapointId", "output"]);
  }
}
