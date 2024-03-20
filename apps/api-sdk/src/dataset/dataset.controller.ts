import {
  CreateDatasetInput,
  DatasetDto,
  DatasetService,
  DeleteSuccessDto,
  FullDatasetWithCountDto,
} from "@montelo/api-common";
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { EnvId } from "../auth/EnvId.decorator";
import { BearerGuard } from "../auth/bearer.guard";

@ApiTags("Dataset")
@ApiBearerAuth()
@Controller("dataset")
export class DatasetController {
  constructor(private datasetService: DatasetService) {}

  @UseGuards(BearerGuard)
  @Get()
  async getAllDatasets(@EnvId() envId: string): Promise<DatasetDto[]> {
    const datasets = await this.datasetService.getAllDatasets(envId);
    return datasets.map(DatasetDto.fromDataset);
  }

  // this should live under datapoint controller
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
  @UseGuards(BearerGuard)
  @Get(":datasetId")
  async getFullDataset(
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

  @UseGuards(BearerGuard)
  @Post()
  async create(@EnvId() envId: string, @Body() createDatasetInput: CreateDatasetInput): Promise<DatasetDto> {
    const dataset = await this.datasetService.create({ envId, ...createDatasetInput });
    return DatasetDto.fromDataset(dataset);
  }

  @UseGuards(BearerGuard)
  @Delete(":datasetId")
  async delete(@Param("datasetId") datasetId: string): Promise<DeleteSuccessDto> {
    await this.datasetService.delete(datasetId);
    return { success: true };
  }
}
