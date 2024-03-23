import {
  ExperimentDto,
  ExperimentService,
  GetExperimentsOpts,
  PaginatedExperimentsDto,
  PaginatedExperimentWithDatapointRunsDto,
} from "@montelo/api-common";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UseAuthGuards } from "../../common/guards/guard";

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
  @Get("experiment/:experimentId")
  async getPaginatedExperimentWithDatapointRuns(
    @Param("experimentId") experimentId: string,
    @Query("take") take?: string,
    @Query("skip") skip?: string,
  ): Promise<PaginatedExperimentWithDatapointRunsDto> {
    const options: GetExperimentsOpts = {
      take: take ? parseInt(take) : undefined,
      skip: skip ? parseInt(skip) : undefined,
    };
    const paginated = await this.experimentService.getExperimentWithDatapointRuns(experimentId, options);
    return PaginatedExperimentWithDatapointRunsDto.fromPaginatedExperimentWithDatapointRuns(paginated);
  }
}
