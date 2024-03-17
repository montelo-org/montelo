import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { loggerConfig } from "@montelo/api-common";
import { AnalyticsModule } from "./core/analytics/analytics.module";
import { DatapointModule } from "./core/datapoint/datapoint.module";
import { DatasetModule } from "./core/dataset/dataset.module";
import { EnvironmentModule } from "./core/environment/environment.module";
import { LogModule } from "./core/log/log.module";
import { ProjectModule } from "./core/project/project.module";
import { TraceModule } from "./core/trace/trace.module";
import { EnvModule, envSchema } from "./env";
import { HealthModule } from "./health/health.module";


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
    DatasetModule,
    DatapointModule,
  ],
})
export class AppModule {}
