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
  expectedOutput: any;

  @ApiProperty()
  @IsString()
  datasetId: string;

  @ApiProperty()
  @IsString()
  createdAt: string;

  static fromDatapoint(datapoint: Datapoint): DatapointDto {
    const base = pick(datapoint, ["id", "input", "expectedOutput", "datasetId"]);
    return {
      ...base,
      createdAt: datapoint.createdAt.toISOString(),
    };
  }
}
