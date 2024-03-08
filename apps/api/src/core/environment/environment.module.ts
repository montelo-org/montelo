import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database";
import { ApiKeyModule } from "../apiKey/apiKey.module";
import { EnvironmentController } from "./environment.controller";
import { EnvironmentService } from "./environment.service";

@Module({
  imports: [DatabaseModule, ApiKeyModule],
  controllers: [EnvironmentController],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
