import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

import { LogsService } from "./logs.service";
import { QLogsInput, Queues } from "./types";


@Processor(Queues.logs)
export class LogsProcessor {
  private logger = new Logger(LogsProcessor.name);

  constructor(private logsService: LogsService) {}

  @Process()
  async handleLog(job: Job<QLogsInput>) {
    const {
      data: { envId, trace, log },
    } = job;
    this.logger.debug(`Handling job for envId ${envId}`);
    try {
      await this.logsService.create(envId, log, trace);
    } catch (e) {
      this.logger.error(`Error handling log: ${e}`);
      throw new Error(`Error handling log: ${e}`);
    }
  }
}
