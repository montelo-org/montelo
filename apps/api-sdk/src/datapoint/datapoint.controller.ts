import { AddToDatasetInput, DatapointDto, DatapointService } from "@montelo/api-common";
import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { EnvId } from "../auth/EnvId.decorator";
import { BearerGuard } from "../auth/bearer.guard";


@ApiTags("Datapoint")
@ApiBearerAuth()
@UseGuards(BearerGuard)
@Controller("dataset/:datasetSlug/datapoint")
export class DatapointController {
  constructor(private datapointService: DatapointService) {}

  @Post()
  async addToDatasetBySlug(
    @EnvId() envId: string,
    @Param("datasetSlug") datasetSlug: string,
    @Body() addToDatasetInput: AddToDatasetInput,
  ): Promise<DatapointDto> {
    const datapoint = await this.datapointService.addToDatasetBySlug(envId, datasetSlug, addToDatasetInput);
    return DatapointDto.fromDatapoint(datapoint);
  }
}
