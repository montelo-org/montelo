import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { DatabaseModule } from "../database";
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
  ],
  controllers: [HealthController],
})
export class HealthModule {}
