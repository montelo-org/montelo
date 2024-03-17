import { Module } from "@nestjs/common";
import { DatabaseModule, DatasetService } from "@montelo/api-common";
import { DatasetController } from "./dataset.controller";


@Module({
  imports: [DatabaseModule],
  controllers: [DatasetController],
  providers: [DatasetService],
  exports: [DatasetService],
})
export class DatasetModule {}
