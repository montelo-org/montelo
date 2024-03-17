import { Dataset } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { pick } from "lodash";

export class DatasetDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  envId: string;

  @ApiProperty()
  @IsString()
  apiName: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  inputSchema: any;

  @ApiProperty()
  outputSchema: any;

  static fromDataset(dataset: Dataset): DatasetDto {
    return pick(dataset, ["id", "envId", "apiName", "name", "description", "inputSchema", "outputSchema"]);
  }
}
