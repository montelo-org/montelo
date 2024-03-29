import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, Logger, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Queue } from "bull";
import { Response } from "express";
import { EnvId } from "../auth/EnvId.decorator";
import { BearerGuard } from "../auth/bearer.guard";
import { CreateLogInput, EndLogInput } from "./dto/create-log.input";
import { QLogsInput, Queues } from "./types";

@ApiTags("Logs")
@ApiBearerAuth()
@UseGuards(BearerGuard)
@Controller()
export class LogsController {
  private logger = new Logger(LogsController.name);

  constructor(@InjectQueue(Queues.logs) private readonly logsQueue: Queue<QLogsInput>) {}

  @Post("logs")
  async createLog(@Res() res: Response, @EnvId() envId: string, @Body() body: CreateLogInput): Promise<{}> {
    try {
      this.logger.debug(`Received log for ${envId}`);
      const queueInput: QLogsInput = {
        action: "create",
        envId,
        datapointRunId: body.datapointRunId,
        trace: body.trace,
        log: body.log,
      };
      await this.logsQueue.add(queueInput, {});
      this.logger.debug(`Added ${envId} to queue`);
      return res.status(200).json({});
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  @Patch("logs/:logId/end")
  async endLog(
    @EnvId() envId: string,
    @Param("logId") logId: string,
    @Body() body: EndLogInput,
    @Res() res: Response,
  ): Promise<{}> {
    try {
      this.logger.debug(`Updating log ${logId} for ${envId}`);
      const queueInput: QLogsInput = {
        action: "end",
        envId,
        logId,
        payload: {
          output: body.output,
          endTime: body.endTime,
          extra: body.extra,
        },
      };
      await this.logsQueue.add(queueInput);
      this.logger.debug(`Added ${envId} to queue`);
      return res.status(200).json({});
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
