import { Controller, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UseAuthGuards } from "../../common/guards/guard";
import { ExperimentDto } from "./dto/experiment.dto";
import { ExperimentService } from "./experiment.service";
import { FullExperimentDto } from "./dto/full-experiment.dto";


@ApiTags("Experiment")
@ApiBearerAuth()
@UseAuthGuards()
@Controller()
export class ExperimentController {
  constructor(private experimentService: ExperimentService) {}

  @Get("dataset/:datasetId/experiment")
  async getExperimentsForDataset(@Param("datasetId") datasetId: string): Promise<ExperimentDto[]> {
    const experiments = await this.experimentService.getExperimentsForDataset(datasetId);
    return experiments.map(ExperimentDto.fromExperiment);
  }

  @Get("env/:envId/experiment")
  async getExperimentsForEnvironment(@Param("envId") envId: string): Promise<ExperimentDto[]> {
    const experiments = await this.experimentService.getExperimentsForEnvironment(envId);
    return experiments.map(ExperimentDto.fromExperiment);
  }

  @Get("experiment/:experimentId")
  async getFullExperiment(@Param("experimentId") experimentId: string): Promise<FullExperimentDto> {
    const fullExperiment = await this.experimentService.getFullExperiment(experimentId);
    return FullExperimentDto.fromFullExperiment(fullExperiment);
  }
}
