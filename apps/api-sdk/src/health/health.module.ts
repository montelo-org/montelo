import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { DatabaseModule } from "@montelo/api-common";
import { LogsModule } from "../logs/logs.module";
import { HealthController } from "./health.controller";
import { ExperimentModule } from "../experiment/experiment.module";

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: "pretty",
    }),
    HttpModule,
    DatabaseModule,
    LogsModule,
    ExperimentModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
