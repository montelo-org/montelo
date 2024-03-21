import { DatabaseModule } from "@montelo/api-common";
import { Module } from "@nestjs/common";
import { ExperimentController } from "./experiment.controller";
import { ExperimentService } from "./experiment.service";

@Module({
  imports: [DatabaseModule],
  controllers: [ExperimentController],
  providers: [ExperimentService],
  exports: [ExperimentService],
})
export class ExperimentModule {}
