import {
  ExperimentDto,
  ExperimentService,
  GetExperimentsOpts,
  PaginatedExperimentWithDatapointsDto,
} from "@montelo/api-common";
import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { EnvId } from "../auth/EnvId.decorator";
import { BearerGuard } from "../auth/bearer.guard";
import { CreateExperimentInput } from "./dto/create-experiment.input";

@ApiTags("Experiment")
@ApiBearerAuth()
@UseGuards(BearerGuard)
@Controller()
export class ExperimentController {
  constructor(private experimentService: ExperimentService) {}

  @Post("dataset/:datasetSlug/experiment")
  async create(
    @EnvId() envId: string,
    @Param("datasetSlug") datasetSlug: string,
    @Body() body: CreateExperimentInput,
  ): Promise<ExperimentDto> {
    const experiment = await this.experimentService.createUsingSlug(envId, datasetSlug, body);
    return ExperimentDto.fromExperiment(experiment);
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
  @Get("experiment/:experimentId/datapoints")
  async getPaginatedDatapointsForExperiment(
    @Param("experimentId") experimentId: string,
    @Query("take") take?: string,
    @Query("skip") skip?: string,
  ): Promise<PaginatedExperimentWithDatapointsDto> {
    const options: GetExperimentsOpts = {
      take: take ? parseInt(take) : undefined,
      skip: skip ? parseInt(skip) : undefined,
    };
    const paginated = await this.experimentService.getExperimentWithDatapoints(experimentId, options);
    return PaginatedExperimentWithDatapointsDto.fromPaginatedExperimentWithDatapoints(paginated);
  }
}
