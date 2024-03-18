import { ApiProperty } from "@nestjs/swagger";
import { FullDatasetDto } from "../../dataset/dto/full-dataset.dto";
import { ExperimentWithDatapoints } from "../experiment.service.types";
import { ExperimentDto } from "./experiment.dto";

export class FullExperimentDto extends ExperimentDto {
  @ApiProperty()
  dataset: FullDatasetDto;

  static fromFullExperiment(experiment: ExperimentWithDatapoints): FullExperimentDto {
    const base = ExperimentDto.fromExperiment(experiment);
    const dataset = FullDatasetDto.fromFullDataset(experiment.dataset);
    return { ...base, dataset };
  }
}
