import { Logger } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { LoggerErrorInterceptor, Logger as PinoLogger } from "nestjs-pino";

import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/catch-all.filter";
import { PrismaClientExceptionFilter } from "./common/filters/prisma-client-exception.filter";
import { envSchema } from "./env";

async function bootstrap() {
  const env = envSchema.parse(process.env);
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(PinoLogger));
  const logger = new Logger("App");

  // filters
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapterHost.httpAdapter));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.use(cookieParser());

  // swagger
  if (env.NODE_ENV === "development") {
    const config = new DocumentBuilder()
      .setTitle("Montelo")
      .setDescription("Documentation for the Montelo API.")
      .setVersion("1.0")
      .addServer(`http://localhost:${env.PORT}/`, "🟢 Local")
      .addServer(`https://api.montelo.ai/`, "🔴 Production")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
  }

  if (env.NODE_ENV === "development") {
    await app.listen(env.PORT);
  } else {
    const hostname = "0.0.0.0";
    await app.listen(env.PORT, hostname);
    console.log(`Prod app listening to ${env.PORT} on ${hostname}`);
  }

  // graceful shutdown func
  const gracefulShutdown = async () => {
    logger.log("NestJS application is shutting down...");
    await app.close();
    logger.log("Application has been shut down.");
    process.exit(0);
  };

  // SIGINT is typically sent when the user presses Ctrl+C in the terminal
  process.on("SIGINT", gracefulShutdown);
  // SIGTERM is a termination signal typically sent from system shutdown operations
  process.on("SIGTERM", gracefulShutdown);
  // Optionally handle other signals, e.g., SIGHUP (hang up)
  process.on("SIGHUP", gracefulShutdown);
}

void bootstrap();
