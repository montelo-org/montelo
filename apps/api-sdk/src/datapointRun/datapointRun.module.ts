import { DatabaseModule } from "@montelo/api-common";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { CostulatorModule } from "../costulator/costulator.module";
import { DatapointRunController } from "./datapointRun.controller";
import { DatapointRunQueueHealthIndicator } from "./datapointRun.health";
import { DatapointRunProcessor } from "./datapointRun.processor";
import { DatapointRunService } from "./datapointRun.service";
import { Queues } from "./types";


@Module({
  imports: [
    BullModule.registerQueue({
      name: Queues.datapointRun,
    }),
    DatabaseModule,
    CostulatorModule,
  ],
  controllers: [DatapointRunController],
  providers: [DatapointRunService, DatapointRunProcessor, DatapointRunQueueHealthIndicator],
  exports: [DatapointRunQueueHealthIndicator],
})
export class DatapointRunModule {}
