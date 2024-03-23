import { ApiProperty } from "@nestjs/swagger";
import { PaginatedFullExperiment } from "../experiment.types";
import { FullExperimentDto } from "./full-experiment.dto";

export class PaginatedFullExperimentDto {
  @ApiProperty()
  experiment: FullExperimentDto;

  @ApiProperty()
  totalDatapointRuns: number;

  static fromPaginatedFullExperiment(paginated: PaginatedFullExperiment): PaginatedFullExperimentDto {
    return {
      experiment: FullExperimentDto.fromFullExperiment(paginated.experiment),
      totalDatapointRuns: paginated.totalDatapointRuns,
    };
  }
}
