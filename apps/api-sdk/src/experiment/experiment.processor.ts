import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { ExperimentService } from "./experiment.service";
import { QExperimentInput, Queues } from "./types";

@Processor(Queues.experiments)
export class ExperimentProcessor {
  private logger = new Logger(ExperimentProcessor.name);

  constructor(private experimentService: ExperimentService) {}

  @Process()
  async handleLog(job: Job<QExperimentInput>) {
    const { data } = job;
    this.logger.debug(`Handling run for experiment ${data.experimentId}`);
    await this.experimentService.createRun(data);
  }
}
