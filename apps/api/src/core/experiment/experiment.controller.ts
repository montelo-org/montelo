import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UseAuthGuards } from "../../common/guards/guard";
import { ExperimentDto } from "./dto/experiment.dto";
import { FullExperimentDto } from "./dto/full-experiment.dto";
import { PaginatedExperimentsDto } from "./dto/paginated-experiments.dto";
import { ExperimentService } from "./experiment.service";
import { GetExperimentsOpts } from "./experiment.types";


@ApiTags("Experiment")
@ApiBearerAuth()
@UseAuthGuards()
@Controller()
export class ExperimentController {
  constructor(private experimentService: ExperimentService) {}

  @Get("dataset/:datasetId/experiment")
  async getExperimentsForDataset(@Param("datasetId") datasetId: string): Promise<ExperimentDto[]> {
    const experiments = await this.experimentService.getExperimentsForDataset(datasetId);
    return experiments.map(ExperimentDto.fromExperiment);
  }

  @ApiQuery({
    name: "take",
    type: String,
    required: false,
  })
  @ApiQuery({
    name: "skip",
    type: String,
    required: false,
  })
  @Get("env/:envId/experiment")
  async getPaginatedExperimentsForEnvironment(
    @Param("envId") envId: string,
    @Query("take") take?: string,
    @Query("skip") skip?: string,
  ): Promise<PaginatedExperimentsDto> {
    const options: GetExperimentsOpts = {
      take: take ? parseInt(take) : undefined,
      skip: skip ? parseInt(skip) : undefined,
    };
    const paginated = await this.experimentService.getExperimentsForEnvironment(envId, options);
    return PaginatedExperimentsDto.fromPaginatedExperiments(paginated);
  }

  @Get("experiment/:experimentId")
  async getFullExperiment(@Param("experimentId") experimentId: string): Promise<FullExperimentDto> {
    const fullExperiment = await this.experimentService.getFullExperiment(experimentId);
    return FullExperimentDto.fromFullExperiment(fullExperiment);
  }
}
