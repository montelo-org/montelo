import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { DeleteSuccessDto } from "../../common/dto/delete-success.dto";
import { TraceWithLogsDto } from "./dto/trace-with-logs.dto";
import { TraceService } from "./trace.service";


@ApiTags("Trace")
@ApiBearerAuth()
@Controller("trace/:traceId")
export class TraceController {
  constructor(private traceService: TraceService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Param("traceId") traceId: string): Promise<TraceWithLogsDto> {
    const trace = await this.traceService.getById(traceId);
    return TraceWithLogsDto.fromTraceWithLogs(trace);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Param("traceId") traceId: string): Promise<DeleteSuccessDto> {
    await this.traceService.delete(traceId);
    return { success: true };
  }
}
