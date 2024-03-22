import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, Logger, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Queue } from "bull";
import { BearerGuard } from "../auth/bearer.guard";
import { DatapointRunService } from "./datapointRun.service";
import { CreateDatapointRunInput } from "./dto/create-datapoint-run.input";
import { DatapointRunDto } from "./dto/datapoint-run.dto";
import { EventQueuedDto } from "./dto/event-queued.dto";
import { UpdateDatapointRunInput } from "./dto/update-datapoint-run.input";
import { QExperimentInput, Queues } from "./types";


@ApiTags("Datapoint Run")
@ApiBearerAuth()
@UseGuards(BearerGuard)
@Controller()
export class DatapointRunController {
  private logger = new Logger(DatapointRunController.name);

  constructor(
    @InjectQueue(Queues.datapointRun) private readonly datapointRunQueue: Queue<QExperimentInput>,
    private readonly datapointRunService: DatapointRunService,
  ) {}

  @Post("datapoint-run")
  async createDatapointRun(@Body() body: CreateDatapointRunInput): Promise<DatapointRunDto> {
    const datapointRun = await this.datapointRunService.createRun(body);
    return DatapointRunDto.fromDatapointRun(datapointRun);
  }

  @Patch("datapoint-run")
  async updateDatapointRun(@Body() body: UpdateDatapointRunInput): Promise<EventQueuedDto> {
    const queueInput: QExperimentInput = body;
    await this.datapointRunQueue.add(queueInput);
    this.logger.debug(`Added datapoint run ${body.datapointRunId} to queue`);
    return { success: true };
  }
}
