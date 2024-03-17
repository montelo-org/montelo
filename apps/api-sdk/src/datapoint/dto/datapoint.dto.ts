import { Datapoint } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { pick } from "lodash";

export class DatapointDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  input: any;

  @ApiProperty()
  output: any;

  @ApiProperty()
  @IsString()
  datasetId: string;

  static fromDatapoint(datapoint: Datapoint): DatapointDto {
    return pick(datapoint, ["id", "input", "output", "datasetId"]);
  }
}
