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
    const { data } = job;
    const { envId, action } = data;
    this.logger.debug(`Handling ${action} job for envId ${envId}`);

    switch (action) {
      case "create": {
        const { log, trace, datapointRunId } = data;
        await this.logsService.create(envId, datapointRunId, log, trace);
        break;
      }
      case "end": {
        const { logId, payload } = data;
        await this.logsService.end(logId, payload);
        break;
      }
    }
  }
}
