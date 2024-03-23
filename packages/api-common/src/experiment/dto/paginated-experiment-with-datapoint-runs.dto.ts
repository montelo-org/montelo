import { ApiProperty } from "@nestjs/swagger";
import { PaginatedExperimentWithDatapointRuns } from "../experiment.types";
import { ExperimentWithDatapointRunsDto } from "./experiment-with-datapoint-runs.dto";

export class PaginatedExperimentWithDatapointRunsDto {
  @ApiProperty()
  experiment: ExperimentWithDatapointRunsDto;

  @ApiProperty()
  totalDatapointRuns: number;

  static fromPaginatedExperimentWithDatapointRuns(
    paginated: PaginatedExperimentWithDatapointRuns,
  ): PaginatedExperimentWithDatapointRunsDto {
    return {
      experiment: ExperimentWithDatapointRunsDto.fromExperimentWithDatapointRuns(paginated.experiment),
      totalDatapointRuns: paginated.totalDatapointRuns,
    };
  }
}
