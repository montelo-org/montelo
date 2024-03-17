import { DatasetService } from "@montelo/api-common";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClerkAuthGuard } from "../../common/guards/auth.guard";
import { CreateDatasetInput } from "./dto/create-dataset.input";
import { DatasetDto } from "./dto/dataset.dto";


@ApiTags("Dataset")
@ApiBearerAuth()
@Controller("dataset")
export class DatasetController {
  constructor(private datasetService: DatasetService) {}

  @UseGuards(ClerkAuthGuard)
  @Get(":datasetId")
  async get(@Param("datasetId") datasetId: string): Promise<DatasetDto> {
    const dataset = await this.datasetService.getDatasetById(datasetId);
    return DatasetDto.fromDataset(dataset);
  }

  @UseGuards(ClerkAuthGuard)
  @Post()
  async create(@Body() createDatasetInput: CreateDatasetInput): Promise<DatasetDto> {
    const dataset = await this.datasetService.createDataset(createDatasetInput);
    return DatasetDto.fromDataset(dataset);
  }
}
