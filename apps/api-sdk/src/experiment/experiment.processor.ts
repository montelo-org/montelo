import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { LogsService } from "./logs.service";
import { QExperimentInput, Queues } from "./types";


@Processor(Queues.experiments)
export class ExperimentProcessor {
  private logger = new Logger(ExperimentProcessor.name);

  constructor(private logsService: LogsService) {}

  @Process()
  async handleLog(job: Job<QExperimentInput>) {
    const {
      data: { envId, trace, log },
    } = job;
    this.logger.debug(`Handling job for envId ${envId}`);
    await this.logsService.create(envId, log, trace);
  }
}
