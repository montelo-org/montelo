import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";

import { ClerkAuthGuard } from "../../common/guards/auth.guard";
import { LogsDto } from "./dto/logs.dto";
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
  @ApiQuery({
    name: "skip",
    type: String,
    description: "How many traces to skip. If undefined starts from beginning.",
    required: false,
  })
  @ApiQuery({
    name: "lastTimestamp",
    type: String,
    description: "The timestamp of the last trace. If undefined starts from the latest trace.",
    required: false,
  })
  @UseGuards(ClerkAuthGuard)
  @Get()
  async getAll(
    @Param("envId") envId: string,
    @Query("take") take?: string,
    @Query("skip") skip?: string,
    @Query("lastTimestamp") lastTimestamp?: string,
  ): Promise<LogsDto> {
    const options = {
      take: take ? parseInt(take) : undefined,
      skip: skip ? parseInt(skip) : undefined,
      cursor: lastTimestamp || undefined,
    };

    const logsAndCount = await this.logService.findAllForEnv(envId, options);
    return LogsDto.fromLogsWithCount(logsAndCount);
  }
}
