import { DatabaseModule } from "@montelo/api-common";
import { Module } from "@nestjs/common";
import { DatapointRunController } from "./datapointRun.controller";
import { DatapointRunService } from "./datapointRun.service";


@Module({
  imports: [DatabaseModule],
  controllers: [DatapointRunController],
  providers: [DatapointRunService],
  exports: [DatapointRunService],
})
export class DatapointRunModule {}
