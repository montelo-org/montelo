import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, Logger, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Queue } from "bull";
import { BearerGuard } from "../auth/bearer.guard";
import { CreateExperimentInput } from "./dto/create-experiment.input";
import { CreateRunInput } from "./dto/create-run.input";
import { EventQueuedDto } from "./dto/event-queued.dto";
import { ExperimentDto } from "./dto/experiment.dto";
import { ExperimentService } from "./experiment.service";
import { QExperimentInput, Queues } from "./types";


@ApiTags("Experiment")
@ApiBearerAuth()
@Controller("experiment")
export class ExperimentController {
  private logger = new Logger(ExperimentController.name);

  constructor(
    @InjectQueue(Queues.experiments) private readonly experimentQueue: Queue<QExperimentInput>,
    private experimentService: ExperimentService,
  ) {}

  @UseGuards(BearerGuard)
  @Post()
  async create(@Body() body: CreateExperimentInput): Promise<ExperimentDto> {
    const experiment = await this.experimentService.create(body);
    return ExperimentDto.fromExperiment(experiment);
  }

  @UseGuards(BearerGuard)
  @Post("/run")
  async run(@Body() body: CreateRunInput): Promise<EventQueuedDto> {
    const queueInput: QExperimentInput = body;
    await this.experimentQueue.add(queueInput);
    this.logger.debug(`Added experiment ${body.experimentId} to queue`);
    return { success: true };
  }
}
