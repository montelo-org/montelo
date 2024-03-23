import { AddToDatasetInput, DatapointDto, DatapointService, DeleteSuccessDto } from "@montelo/api-common";
import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UseAuthGuards } from "../../common/guards/guard";


@ApiTags("Datapoint")
@ApiBearerAuth()
@UseAuthGuards()
@Controller()
export class DatapointController {
  constructor(private datapointService: DatapointService) {}

  @Post("dataset/:datasetId/datapoint")
  async createDatapoint(
    @Param("datasetId") datasetId: string,
    @Body() addToDatasetInput: AddToDatasetInput,
  ): Promise<DatapointDto> {
    const datapoint = await this.datapointService.addToDatasetById(datasetId, addToDatasetInput);
    return DatapointDto.fromDatapoint(datapoint);
  }

  @Delete("datapoint/:datapointId")
  async deleteDatapoint(@Param("datapointId") datapointId: string): Promise<DeleteSuccessDto> {
    await this.datapointService.delete(datapointId);
    return { success: true };
  }
}
