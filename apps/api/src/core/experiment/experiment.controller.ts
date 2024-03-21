import { Controller, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UseAuthGuards } from "../../common/guards/guard";
import { ExperimentDto } from "./dto/experiment.dto";
import { ExperimentService } from "./experiment.service";

@ApiTags("Experiment")
@ApiBearerAuth()
@UseAuthGuards()
@Controller()
export class ExperimentController {
  constructor(private experimentService: ExperimentService) {}

  @Get("dataset/:datasetId/experiment")
  async getExperiments(@Param("datasetId") datasetId: string): Promise<ExperimentDto[]> {
    const experiments = await this.experimentService.getAllForDataset(datasetId);
    return experiments.map(ExperimentDto.fromExperiment);
  }

  @Get("experiment/:experimentId")
  async getExperiment(@Param("experimentId") experimentId: string): Promise<ExperimentDto> {
    const experiment = await this.experimentService.getExperiment(experimentId);
    return ExperimentDto.fromExperiment(experiment);
  }
}
