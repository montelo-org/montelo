import pino from "pino";

declare global {
  var logger: pino.Logger;
}

function getLogger() {
  console.log("Starting Logger...");

  return pino({
    level: process.env.LOG_LEVEL || "info",
    transport: {
      targets: [
        {
          target: "pino-pretty",
        },
      ],
    },
  });
}

const logger: pino.Logger =
  process.env.NODE_ENV === "development" ? global.logger ?? (global.logger = getLogger()) : getLogger();

export default logger;
