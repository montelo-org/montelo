import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";
import { Queue } from "bull";
import { QExperimentInput, Queues } from "./types";


@Injectable()
export class ExperimentQueueHealthIndicator extends HealthIndicator {
  constructor(@InjectQueue(Queues.experiments) protected readonly experimentQueue: Queue<QExperimentInput>) {
    super();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    // Check if the queue itself is ready
    const key = `queue-${Queues.experiments}`;
    const queueIsReady = !!(await this.experimentQueue.isReady());
    const queueResult = this.getStatus(key, queueIsReady);

    // Attempt to ping Redis with a timeout
    const redisPing = await this.pingRedisWithTimeout();
    const redisResult = this.getStatus(`${key}-redis`, redisPing);

    const isHealthy = queueIsReady && redisPing;
    const result = {
      ...queueResult,
      ...redisResult,
    };

    if (!isHealthy) {
      throw new HealthCheckError("Queue or Redis is not connected", result);
    }

    return result;
  }

  private async pingRedisWithTimeout(): Promise<boolean> {
    try {
      const timeout = new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(false), 1000); // 5 seconds timeout
      });
      // eslint-disable-next-line no-async-promise-executor
      const ping = new Promise<boolean>(async (resolve) => {
        try {
          const client = this.experimentQueue.client;
          const pingResult = await client.ping();
          resolve(pingResult === "PONG");
        } catch (error) {
          console.error("Ping operation failed:", error);
          resolve(false);
        }
      });

      // Race between our ping operation and the timeout
      return Promise.race([ping, timeout]);
    } catch (error) {
      console.error("Failed to ping Redis with timeout:", error);
      return false;
    }
  }
}
