import { DatabaseModule, DatasetService } from "@montelo/api-common";
import { Module } from "@nestjs/common";
import { DatasetController } from "./dataset.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [DatasetController],
  providers: [DatasetService],
  exports: [DatasetService],
})
export class DatasetModule {}
