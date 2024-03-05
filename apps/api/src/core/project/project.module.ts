import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { ApiKeyModule } from "../apiKey/apiKey.module";

@Module({
  imports: [DatabaseModule, ApiKeyModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
