import { DeleteSuccessDto } from "@montelo/api-common";
import { Controller, Delete, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UseAuthGuards } from "../../common/guards/guard";
import { TraceWithLogsDto } from "./dto/trace-with-logs.dto";
import { TraceService } from "./trace.service";

@ApiTags("Trace")
@ApiBearerAuth()
@UseAuthGuards()
@Controller("trace/:traceId")
export class TraceController {
  constructor(private traceService: TraceService) {}

  @Get()
  async getTrace(@Param("traceId") traceId: string): Promise<TraceWithLogsDto> {
    const trace = await this.traceService.getById(traceId);
    return TraceWithLogsDto.fromTraceWithLogs(trace);
  }

  @Delete()
  async deleteTrace(@Param("traceId") traceId: string): Promise<DeleteSuccessDto> {
    await this.traceService.delete(traceId);
    return { success: true };
  }
}
