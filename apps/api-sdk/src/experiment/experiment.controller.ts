import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { EnvId } from "../auth/EnvId.decorator";
import { BearerGuard } from "../auth/bearer.guard";
import { CreateExperimentInput } from "./dto/create-experiment.input";
import { ExperimentDto } from "./dto/experiment.dto";
import { FullExperimentDto } from "./dto/full-experiment.dto";
import { ExperimentService } from "./experiment.service";


@ApiTags("Experiment")
@ApiBearerAuth()
@UseGuards(BearerGuard)
@Controller()
export class ExperimentController {
  constructor(private experimentService: ExperimentService) {}

  @Get("experiment/:experimentId")
  async getFullExperiment(@Param("experimentId") experimentId: string): Promise<FullExperimentDto> {
    const experimentWithDatapoints = await this.experimentService.getExperimentWithDatapoints(experimentId);
    return FullExperimentDto.fromFullExperiment(experimentWithDatapoints);
  }

  @Post("dataset/:datasetSlug/experiment")
  async create(
    @EnvId() envId: string,
    @Param("datasetSlug") datasetSlug: string,
    @Body() body: CreateExperimentInput,
  ): Promise<ExperimentDto> {
    const experiment = await this.experimentService.createUsingSlug(envId, datasetSlug, body);
    return ExperimentDto.fromExperiment(experiment);
  }
}
