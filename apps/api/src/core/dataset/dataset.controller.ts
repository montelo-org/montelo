import {
  CreateDatasetInput,
  DatasetDto,
  DatasetService,
  DeleteSuccessDto, ExperimentDto,
  FullDatasetWithCountDto,
} from "@montelo/api-common";
import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UseAuthGuards } from "../../common/guards/guard";
import { validateDatasetSchema } from "../../common/validations/validateDatasetSchema";

@ApiTags("Dataset")
@ApiBearerAuth()
@UseAuthGuards()
@Controller()
export class DatasetController {
  constructor(private datasetService: DatasetService) {}

  @Get("env/:envId/dataset")
  async getAllDatasetsForEnv(@Param("envId") envId: string): Promise<DatasetDto[]> {
    const datasets = await this.datasetService.getAllDatasets(envId);
    return datasets.map(DatasetDto.fromDataset);
  }

  @ApiQuery({
    name: "take",
    type: String,
    description: "How many traces to get. If undefined returns all.",
    required: false,
  })
  @ApiQuery({
    name: "skip",
    type: String,
    description: "How many traces to skip. If undefined starts from beginning.",
    required: false,
  })
  @Get("dataset/:datasetId")
  async getDatasetWithDatapoints(
    @Param("datasetId") datasetId: string,
    @Query("take") take?: string,
    @Query("skip") skip?: string,
  ): Promise<FullDatasetWithCountDto> {
    const options = {
      take: take ? parseInt(take) : undefined,
      skip: skip ? parseInt(skip) : undefined,
    };
    const fullDatasetWithCount = await this.datasetService.getFullDatasetById(datasetId, options);
    return FullDatasetWithCountDto.fromFullDatasetWithCount(fullDatasetWithCount);
  }

  @Get("dataset/:datasetId/experiments")
  async getDatasetRecentExperiments(@Param("datasetId") datasetId: string): Promise<ExperimentDto[]> {
    const options = {
      take: 5,
    };
    const experiments = await this.datasetService.getDatasetExperiments(datasetId, options);
    return experiments.map(ExperimentDto.fromExperiment);
  }

  @Post("env/:envId/dataset")
  async createDataset(
    @Param("envId") envId: string,
    @Body() createDatasetInput: CreateDatasetInput,
  ): Promise<DatasetDto> {
    validateDatasetSchema(createDatasetInput.inputSchema, createDatasetInput.outputSchema);
    const dataset = await this.datasetService.create({ envId, ...createDatasetInput });
    return DatasetDto.fromDataset(dataset);
  }

  @Delete("dataset/:datasetId")
  async deleteDataset(@Param("datasetId") datasetId: string): Promise<DeleteSuccessDto> {
    await this.datasetService.delete(datasetId);
    return { success: true };
  }
}
