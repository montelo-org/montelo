import { DatabaseModule } from "@montelo/api-common";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { CostulatorModule } from "../costulator/costulator.module";
import { ExperimentController } from "./experiment.controller";
import { ExperimentQueueHealthIndicator } from "./experiment.health";
import { ExperimentProcessor } from "./experiment.processor";
import { ExperimentService } from "./experiment.service";
import { Queues } from "./types";

@Module({
  imports: [
    BullModule.registerQueue({
      name: Queues.experiments,
    }),
    DatabaseModule,
    CostulatorModule,
  ],
  controllers: [ExperimentController],
  providers: [ExperimentService, ExperimentProcessor, ExperimentQueueHealthIndicator],
  exports: [ExperimentQueueHealthIndicator],
})
export class ExperimentModule {}
