import { DatapointService } from "@montelo/api-common";
import { DeleteSuccessDto } from "@montelo/browser-client";
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BearerGuard } from "../auth/bearer.guard";
import { AddToDatasetInput } from "./dto/add-to-dataset.input";
import { DatapointDto } from "./dto/datapoint.dto";


@ApiTags("Datapoint")
@ApiBearerAuth()
@Controller("dataset/:datasetId/datapoint")
export class DatapointController {
  constructor(private datapointService: DatapointService) {}

  @UseGuards(BearerGuard)
  @Post()
  async addToDataset(
    @Param("datasetId") datasetId: string,
    @Body() addToDatasetInput: AddToDatasetInput,
  ): Promise<DatapointDto> {
    const datapoint = await this.datapointService.addToDataset({ datasetId, ...addToDatasetInput });
    return DatapointDto.fromDatapoint(datapoint);
  }

  @UseGuards(BearerGuard)
  @Get()
  async getAll(@Param("datasetId") datasetId: string): Promise<DatapointDto[]> {
    const datapoints = await this.datapointService.getAllForDataset(datasetId);
    return datapoints.map(DatapointDto.fromDatapoint);
  }

  @UseGuards(BearerGuard)
  @Delete(":datapointId")
  async removeFromDataset(@Param("datapointId") datapointId: string): Promise<DeleteSuccessDto> {
    await this.datapointService.delete(datapointId);
    return { success: true };
  }
}
