import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database";
import { LogController } from "./log.controller";
import { LogService } from "./log.service";


@Module({
  imports: [DatabaseModule],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
