import { Controller, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UseAuthGuards } from "../../common/guards/guard";
import { TraceWithLogsDto } from "../trace/dto/trace-with-logs.dto";
import { DatapointRunService } from "./datapointRun.service";


@ApiTags("Datapoint Run")
@ApiBearerAuth()
@UseAuthGuards()
@Controller()
export class DatapointRunController {
  constructor(private datapointRunService: DatapointRunService) {}

  @Get("datapoint-run/:datapointRunId/trace")
  async getDatapointTrace(@Param("datapointRunId") datapointRunId: string): Promise<TraceWithLogsDto> {
    const trace = await this.datapointRunService.getDatapointRunTrace(datapointRunId);
    return TraceWithLogsDto.fromTraceWithLogs(trace);
  }
}
