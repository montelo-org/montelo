import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import { SwaggerTheme, SwaggerThemeName } from "swagger-themes";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("App");

  // swagger
  if (process.env.NODE_ENV === "development") {
    const config = new DocumentBuilder()
      .setTitle("Montelo")
      .setDescription("Documentation for the Montelo API.")
      .setVersion("1.0")
      .addServer(`http://localhost:${process.env.PORT!}/`, "🟢 Local")
      // .addServer("https://production.yourapi.com/", "🔴 Production")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const theme = new SwaggerTheme("v3");
    const themeName: SwaggerThemeName = "dark";
    const options: SwaggerCustomOptions = {
      explorer: true,
      customCss: theme.getBuffer(themeName),
    };
    // SwaggerUI gets set to /docs
    SwaggerModule.setup("docs", app, document, options);
  }

  if (process.env.NODE_ENV === "development") {
    await app.listen(process.env.PORT!);
  } else {
    await app.listen(process.env.PORT!, "0.0.0.0");
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
