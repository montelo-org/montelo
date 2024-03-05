import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";

import { ClerkAuthGuard } from "../../common/guards/auth.guard";
import { LogDto } from "./dto/log.dto";
import { LogService } from "./log.service";

@ApiTags("Log")
@ApiBearerAuth()
@Controller("env/:envId/log")
export class LogController {
  constructor(private logService: LogService) {}

  @ApiQuery({
    name: "take",
    type: String,
    description: "How many traces to get. If undefined returns all.",
    required: false,
  })
  @UseGuards(ClerkAuthGuard)
  @Get()
  async getAll(@Param("envId") envId: string, @Query("take") take?: string): Promise<LogDto[]> {
    const options = take ? { take: parseInt(take) } : undefined;
    const logs = await this.logService.findAllForEnv(envId, options);
    return logs.map(LogDto.fromLog);
  }
}
