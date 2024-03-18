import { DatasetService } from "@montelo/api-common";
import { DeleteSuccessDto } from "@montelo/browser-client";
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClerkAuthGuard } from "../../common/guards/auth.guard";
import { CreateDatasetInput } from "./dto/create-dataset.input";
import { DatasetDto } from "./dto/dataset.dto";
import { FullDatasetDto } from "./dto/full-dataset.dto";


@ApiTags("Dataset")
@ApiBearerAuth()
@Controller("env/:envId/dataset")
export class DatasetController {
  constructor(private datasetService: DatasetService) {}

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getAllDatasets(@Param("envId") envId: string): Promise<DatasetDto[]> {
    const datasets = await this.datasetService.getAllDatasets(envId);
    return datasets.map(DatasetDto.fromDataset);
  }

  @UseGuards(ClerkAuthGuard)
  @Get(":datasetId")
  async getFullDataset(@Param("envId") envId: string, @Param("datasetId") datasetId: string): Promise<FullDatasetDto> {
    const fullDataset = await this.datasetService.getFullDatasetById(datasetId);
    return FullDatasetDto.fromFullDataset(fullDataset);
  }

  @UseGuards(ClerkAuthGuard)
  @Post()
  async create(@Param("envId") envId: string, @Body() createDatasetInput: CreateDatasetInput): Promise<DatasetDto> {
    const dataset = await this.datasetService.create(createDatasetInput);
    return DatasetDto.fromDataset(dataset);
  }

  @UseGuards(ClerkAuthGuard)
  @Delete()
  async delete(@Param("envId") envId: string, @Param("datasetId") datasetId: string): Promise<DeleteSuccessDto> {
    await this.datasetService.delete(datasetId);
    return { success: true };
  }
}
