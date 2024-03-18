import { DatapointService } from "@montelo/api-common";
import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { EnvId } from "../auth/EnvId.decorator";
import { BearerGuard } from "../auth/bearer.guard";
import { AddToDatasetInput } from "./dto/add-to-dataset.input";
import { DatapointDto } from "./dto/datapoint.dto";


@ApiTags("Datapoint")
@ApiBearerAuth()
@Controller("dataset/:datasetSlug/datapoint")
export class DatapointController {
  constructor(private datapointService: DatapointService) {}

  @UseGuards(BearerGuard)
  @Post()
  async addToDataset(
    @EnvId() envId: string,
    @Param("datasetSlug") datasetSlug: string,
    @Body() addToDatasetInput: AddToDatasetInput,
  ): Promise<DatapointDto> {
    const datapoint = await this.datapointService.addToDatasetBySlug(envId, datasetSlug, addToDatasetInput);
    return DatapointDto.fromDatapoint(datapoint);
  }
}
