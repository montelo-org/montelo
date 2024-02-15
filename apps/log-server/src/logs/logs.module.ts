import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { CostulatorModule } from "../costulator/costulator.module";
import { DatabaseModule } from "../database";
import { LogsController } from "./logs.controller";
import { LogsHealthIndicator } from "./logs.health";
import { LogsProcessor } from "./logs.processor";
import { LogsService } from "./logs.service";
import { Queues } from "./types";

@Module({
  imports: [
    BullModule.registerQueue({
      name: Queues.logs,
    }),
    DatabaseModule,
    CostulatorModule,
  ],
  controllers: [LogsController],
  providers: [LogsService, LogsProcessor, LogsHealthIndicator],
  exports: [LogsHealthIndicator],
})
export class LogsModule {}