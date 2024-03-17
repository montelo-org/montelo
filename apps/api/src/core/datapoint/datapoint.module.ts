import { Module } from "@nestjs/common";
import { DatabaseModule, DatapointService } from "@montelo/api-common";
import { DatapointController } from "./datapoint.controller";


@Module({
  imports: [DatabaseModule],
  controllers: [DatapointController],
  providers: [DatapointService],
  exports: [DatapointService],
})
export class DatapointModule {}
