import { ApiProperty } from "@nestjs/swagger";
import { FullDatasetDto } from "../../dataset";
import { ExperimentWithDatapoints } from "../experiment.types";
import { ExperimentDto } from "./experiment.dto";

export class ExperimentWithDatapointsDto extends ExperimentDto {
  @ApiProperty()
  dataset: FullDatasetDto;

  static fromExperimentWithDatapoints(exp: ExperimentWithDatapoints): ExperimentWithDatapointsDto {
    const base = ExperimentDto.fromExperiment(exp);
    return {
      ...base,
      dataset: FullDatasetDto.fromFullDataset(exp.dataset),
    };
  }
}
