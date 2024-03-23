import { ExperimentDto } from "@montelo/api-common";
import { ApiProperty } from "@nestjs/swagger";
import { DatapointRunWithExperiment } from "../datapointRun.types";
import { DatapointRunDto } from "./datapointRun.dto";

export class DatapointRunWithExperimentDto extends DatapointRunDto {
  @ApiProperty()
  experiment: ExperimentDto;

  static fromDatapointRunWithExperiment(run: DatapointRunWithExperiment): DatapointRunWithExperimentDto {
    const base = DatapointRunDto.fromDatapointRun(run);
    return {
      ...base,
      experiment: ExperimentDto.fromExperiment(run.experiment),
    };
  }
}
