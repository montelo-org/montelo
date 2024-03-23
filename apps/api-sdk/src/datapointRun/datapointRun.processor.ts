import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { DatapointRunService } from "./datapointRun.service";
import { QExperimentInput, Queues } from "./types";


@Processor(Queues.datapointRun)
export class DatapointRunProcessor {
  private logger = new Logger(DatapointRunProcessor.name);

  constructor(private datapointRunService: DatapointRunService) {}

  @Process()
  async handleLog(job: Job<QExperimentInput>) {
    const { data } = job;
    this.logger.debug(`Handling datapoint run ${data.datapointRunId}`);
    await this.datapointRunService.updateRun(data.datapointRunId, data.output);
  }
}
