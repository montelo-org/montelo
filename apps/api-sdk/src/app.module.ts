import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { AuthModule } from "./auth/auth.module";
import { loggerConfig } from "./common/configs/logger.config";
import { HealthModule } from "./health/health.module";
import { LogsModule } from "./logs/logs.module";

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    BullModule.forRootAsync({
      useFactory: async () => {
        const credentials = {
          username: process.env.REDIS_USER,
          password: process.env.REDIS_PASSWORD,
          host: process.env.REDIS_HOSTNAME,
          port: +process.env.REDIS_PORT!,
        };
        return {
          redis: {
            ...credentials,
            family: 6,
          },
        };
      },
    }),
    HealthModule,
    AuthModule,
    LogsModule,
  ],
})
export class AppModule {}