import { ApiProperty } from "@nestjs/swagger";
import { PaginatedExperiments } from "../experiment.types";
import { ExperimentDto } from "./experiment.dto";

export class PaginatedExperimentsDto {
  @ApiProperty({
    type: [ExperimentDto],
  })
  experiments: ExperimentDto[];

  @ApiProperty()
  totalCount: number;

  static fromPaginatedExperiments(paginated: PaginatedExperiments): PaginatedExperimentsDto {
    return {
      experiments: paginated.experiments.map(ExperimentDto.fromExperiment),
      totalCount: paginated.totalCount,
    };
  }
}
