import { ApiProperty } from "@nestjs/swagger";
import { DatasetDto } from "../../dataset";
import { ExperimentWithDatapointRuns } from "../experiment.types";
import { ExperimentDto } from "./experiment.dto";
import { FullDatapointRunDto } from "./full-datapoint-run.dto";

export class ExperimentWithDatapointRunsDto extends ExperimentDto {
  @ApiProperty()
  dataset: DatasetDto;

  @ApiProperty({
    type: [FullDatapointRunDto],
  })
  datapointRuns: FullDatapointRunDto[];

  static fromExperimentWithDatapointRuns(exp: ExperimentWithDatapointRuns): ExperimentWithDatapointRunsDto {
    const base = ExperimentDto.fromExperiment(exp);
    return {
      ...base,
      dataset: DatasetDto.fromDataset(exp.dataset),
      datapointRuns: exp.datapointRuns.map(FullDatapointRunDto.fromFullDatapointRun),
    };
  }
}
