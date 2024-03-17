import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClerkAuthGuard } from "../../common/guards/auth.guard";
import { DatapointService } from "@montelo/api-common";
import { DatapointDto } from "./dto/datapoint.dto";


@ApiTags("Datapoint")
@ApiBearerAuth()
@Controller("dataset/:datasetId/datapoint")
export class DatapointController {
  constructor(private datapointService: DatapointService) {}

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getAll(@Param("datasetId") datasetId: string): Promise<DatapointDto[]> {
    const datapoints = await this.datapointService.getAllForDataset(datasetId);
    return datapoints.map(DatapointDto.fromDatapoint);
  }
}
