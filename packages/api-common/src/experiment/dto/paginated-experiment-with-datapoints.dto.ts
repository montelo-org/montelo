import { ApiProperty } from "@nestjs/swagger";
import { PaginatedExperimentWithDatapoints } from "../experiment.types";
import { ExperimentWithDatapointsDto } from "./experiment-with-datapoints.dto";

export class PaginatedExperimentWithDatapointsDto {
  @ApiProperty()
  experiment: ExperimentWithDatapointsDto;

  @ApiProperty()
  totalDatapoints: number;

  static fromPaginatedExperimentWithDatapoints(
    paginated: PaginatedExperimentWithDatapoints,
  ): PaginatedExperimentWithDatapointsDto {
    return {
      experiment: ExperimentWithDatapointsDto.fromExperimentWithDatapoints(paginated.experiment),
      totalDatapoints: paginated.totalDatapoints,
    };
  }
}
