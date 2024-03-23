import { DatabaseModule, ExperimentService } from "@montelo/api-common";
import { Module } from "@nestjs/common";
import { ExperimentController } from "./experiment.controller";


@Module({
  imports: [DatabaseModule],
  controllers: [ExperimentController],
  providers: [ExperimentService],
  exports: [ExperimentService],
})
export class ExperimentModule {}
