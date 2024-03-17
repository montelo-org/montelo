import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, Logger, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Queue } from "bull";
import { Response } from "express";
import { EnvId } from "../auth/EnvId.decorator";
import { BearerGuard } from "../auth/bearer.guard";
import { CreateExperimentInput } from "./dto/create-experiment.input";
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
  async run(@Res() res: Response, @EnvId() envId: string, @Body() body: CreateLogInput): Promise<{}> {
    const queueInput: QExperimentInput = {
      envId,
      trace: body.trace,
      log: body.log,
    };
    await this.experimentQueue.add(queueInput);
    this.logger.debug(`Added ${envId} to queue`);
    return res.status(200).json({});
  }
}
