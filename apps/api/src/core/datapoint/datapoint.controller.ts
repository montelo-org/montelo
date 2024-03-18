import { DatapointService, DeleteSuccessDto } from "@montelo/api-common";
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClerkAuthGuard } from "../../common/guards/auth.guard";
import { AddToDatasetInput } from "./dto/add-to-dataset.input";
import { DatapointDto } from "./dto/datapoint.dto";


@ApiTags("Datapoint")
@ApiBearerAuth()
@Controller("dataset/:datasetId/datapoint")
export class DatapointController {
  constructor(private datapointService: DatapointService) {}

  @UseGuards(ClerkAuthGuard)
  @Post()
  async addToDataset(
    @Param("datasetId") datasetId: string,
    @Body() addToDatasetInput: AddToDatasetInput,
  ): Promise<DatapointDto> {
    const datapoint = await this.datapointService.addToDatasetById(datasetId, addToDatasetInput);
    return DatapointDto.fromDatapoint(datapoint);
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getAll(@Param("datasetId") datasetId: string): Promise<DatapointDto[]> {
    const datapoints = await this.datapointService.getAllForDataset(datasetId);
    return datapoints.map(DatapointDto.fromDatapoint);
  }

  @UseGuards(ClerkAuthGuard)
  @Delete(":datapointId")
  async removeFromDataset(@Param("datasetId") datasetId: string, @Param("datapointId") datapointId: string): Promise<DeleteSuccessDto> {
    await this.datapointService.delete(datapointId);
    return { success: true };
  }
}
