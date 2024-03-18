import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, Get, Logger, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Queue } from "bull";
import { EnvId } from "../auth/EnvId.decorator";
import { BearerGuard } from "../auth/bearer.guard";
import { CreateExperimentInput } from "./dto/create-experiment.input";
import { CreateRunInput } from "./dto/create-run.input";
import { EventQueuedDto } from "./dto/event-queued.dto";
import { ExperimentDto } from "./dto/experiment.dto";
import { FullExperimentDto } from "./dto/full-experiment.dto";
import { ExperimentService } from "./experiment.service";
import { QExperimentInput, Queues } from "./types";

@ApiTags("Experiment")
@ApiBearerAuth()
@Controller()
export class ExperimentController {
  private logger = new Logger(ExperimentController.name);

  constructor(
    @InjectQueue(Queues.experiments) private readonly experimentQueue: Queue<QExperimentInput>,
    private experimentService: ExperimentService,
  ) {}

  @UseGuards(BearerGuard)
  @Get("dataset/experiment/:experimentId")
  async getFullExperiment(@Param("experimentId") experimentId: string): Promise<FullExperimentDto> {
    const experimentWithDatapoints = await this.experimentService.getExperimentWithDatapoints(experimentId);
    return FullExperimentDto.fromFullExperiment(experimentWithDatapoints);
  }

  @UseGuards(BearerGuard)
  @Post("dataset/:datasetSlug/experiment")
  async create(
    @EnvId() envId: string,
    @Param("datasetSlug") datasetSlug: string,
    @Body() body: CreateExperimentInput,
  ): Promise<ExperimentDto> {
    const experiment = await this.experimentService.createUsingSlug(envId, datasetSlug, body);
    return ExperimentDto.fromExperiment(experiment);
  }

  @UseGuards(BearerGuard)
  @Post("dataset/experiment/run")
  async run(@Body() body: CreateRunInput): Promise<EventQueuedDto> {
    const queueInput: QExperimentInput = body;
    await this.experimentQueue.add(queueInput);
    this.logger.debug(`Added experiment ${body.experimentId} to queue`);
    return { success: true };
  }
}
