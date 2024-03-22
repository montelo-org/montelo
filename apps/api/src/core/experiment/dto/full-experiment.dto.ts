import { DatasetDto } from "@montelo/api-common";
import { ApiProperty } from "@nestjs/swagger";
import { FullExperiment } from "../experiment.types";
import { DatapointRunDto } from "./datapoint-run-dto";
import { ExperimentDto } from "./experiment.dto";

export class FullExperimentDto extends ExperimentDto {
  @ApiProperty()
  dataset: DatasetDto;

  @ApiProperty()
  datapointRuns: DatapointRunDto[];

  static fromFullExperiment(fullExperiment: FullExperiment): FullExperimentDto {
    const base = ExperimentDto.fromExperiment(fullExperiment);
    return {
      ...base,
      dataset: DatasetDto.fromDataset(fullExperiment.dataset),
      datapointRuns: fullExperiment.datapointRuns.map(DatapointRunDto.fromDatapointRun),
    };
  }
}
