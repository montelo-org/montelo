import { DatasetService } from "@montelo/api-common";
import { DeleteSuccessDto } from "@montelo/browser-client";
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { EnvId } from "../auth/EnvId.decorator";
import { BearerGuard } from "../auth/bearer.guard";
import { CreateDatasetInput } from "./dto/create-dataset.input";
import { DatasetDto } from "./dto/dataset.dto";
import { FullDatasetDto } from "./dto/full-dataset.dto";


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
  @UseGuards(BearerGuard)
  @Get(":datasetId")
  async getFullDataset(@Param("datasetId") datasetId: string): Promise<FullDatasetDto> {
    const fullDataset = await this.datasetService.getFullDatasetById(datasetId);
    return FullDatasetDto.fromFullDataset(fullDataset);
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
