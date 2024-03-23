import { DatabaseModule } from "@montelo/api-common";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { DatapointRunModule } from "../datapointRun/datapointRun.module";
import { LogsModule } from "../logs/logs.module";
import { HealthController } from "./health.controller";


@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: "pretty",
    }),
    HttpModule,
    DatabaseModule,
    LogsModule,
    DatapointRunModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
