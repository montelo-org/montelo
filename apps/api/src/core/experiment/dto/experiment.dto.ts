import { Experiment } from "@montelo/db";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { pick } from "lodash";

export class ExperimentDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  datasetId: string;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  description: string | null;

  static fromExperiment(experiment: Experiment): ExperimentDto {
    return pick(experiment, ["id", "datasetId", "name", "description"]);
  }
}