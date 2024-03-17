import { DatabaseModule } from "@montelo/api-common";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from "./health.controller";


@Module({
  imports: [TerminusModule, HttpModule, DatabaseModule],
  controllers: [HealthController],
})
export class HealthModule {}
