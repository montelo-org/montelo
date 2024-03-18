import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClerkAuthGuard } from "../../common/guards/auth.guard";
import { ExperimentDto } from "./dto/experiment.dto";
import { ExperimentService } from "./experiment.service";


@ApiTags("Experiment")
@ApiBearerAuth()
@Controller("dataset/:datasetId/experiment")
export class ExperimentController {
  constructor(private experimentService: ExperimentService) {}

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getExperiments(@Param("datasetId") datasetId: string): Promise<ExperimentDto[]> {
    const experiments = await this.experimentService.getAllForDataset(datasetId);
    return experiments.map(ExperimentDto.fromExperiment);
  }

  @UseGuards(ClerkAuthGuard)
  @Get(":experimentId")
  async getExperiment(@Param("datasetId") datasetId: string, @Param("experimentId") experimentId: string): Promise<ExperimentDto> {
    const experiment = await this.experimentService.getExperiment(experimentId);
    return ExperimentDto.fromExperiment(experiment)
  }
}
