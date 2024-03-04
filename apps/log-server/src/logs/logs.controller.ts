import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, Logger, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Queue } from "bull";
import { Response } from "express";

import { EnvId } from "../auth/EnvId.decorator";
import { BearerGuard } from "../auth/bearer.guard";
import { CreateLogInput } from "./dto/create-log.input";
import { QLogsInput, Queues } from "./types";

@ApiTags("Logs")
@ApiBearerAuth()
@Controller()
export class LogsController {
  private logger = new Logger(LogsController.name);

  constructor(@InjectQueue(Queues.logs) private readonly logsQueue: Queue<QLogsInput>) {}

  @UseGuards(BearerGuard)
  @Post("logs")
  async createLog(
    @Res() res: Response,
    @EnvId() envId: string,
    @Body() body: CreateLogInput,
  ): Promise<{}> {
    try {
      this.logger.debug(`Received log for ${envId}`);
      const queueInput: QLogsInput = {
        envId,
        trace: body.trace,
        log: body.log,
      };
      await this.logsQueue.add(queueInput);
      this.logger.debug(`Added ${envId} to queue`);
      return res.status(200).json({});
    } catch(e) {
      this.logger.error(e);
      throw e;
    }
  }
}
