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

  @ApiProperty({
    type: String,
    required: false,
  })
  name: string | null;

  @ApiProperty({
    type: String,
    required: false,
  })
  description: string | null;

  @ApiProperty()
  createdAt: string;

  static fromExperiment(experiment: Experiment): ExperimentDto {
    const base = pick(experiment, ["id", "datasetId", "name", "description"]);
    return {
      ...base,
      createdAt: experiment.createdAt.toISOString(),
    };
  }
}
