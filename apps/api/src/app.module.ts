import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from 'nestjs-pino';

import { AnalyticsModule } from "./core/analytics/analytics.module";
import { EnvironmentModule } from "./core/environment/environment.module";
import { LogModule } from "./core/log/log.module";
import { ProjectModule } from "./core/project/project.module";
import { TraceModule } from "./core/trace/trace.module";
import { EnvModule, envSchema } from "./env";
import { HealthModule } from "./health/health.module";
import { loggerConfig } from "./common/configs/logger.config";

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === "production" ? undefined : ".env.development",
      isGlobal: true,
      validate: envSchema.parse,
    }),
    EnvModule,
    HealthModule,
    ProjectModule,
    EnvironmentModule,
    LogModule,
    AnalyticsModule,
    TraceModule,
  ],
})
export class AppModule { }
