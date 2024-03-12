import { Params } from "nestjs-pino";

const isProduction = process.env.NODE_ENV === "production";
const betterstackSourceToken = process.env.BETTERSTACK_SOURCE_TOKEN;

const pinoPrettyConfig = {
  target: "pino-pretty",
  options: {
    singleLine: isProduction ? true : false,
  },
};
const betterstackConfig = !!betterstackSourceToken &&
  isProduction && { target: "@logtail/pino", options: { sourceToken: betterstackSourceToken } };

export const loggerConfig: Params = {
  pinoHttp: {
    customReceivedMessage: (req) => `Incoming Request: ${req.method} "${req.url}"`,
    customSuccessMessage: (req, res) =>
      res.statusCode === 404
        ? `Resource Not Found: ${req.method} "${req.url}"`
        : `Request Completed: ${req.method} "${req.url}"`,
    customErrorMessage: (req) => `Request Failed: ${req.method} "${req.url}"`,
    customLogLevel: function (req, res, err) {
      if (res?.statusCode >= 400 && res.statusCode < 500) {
        return "warn";
      } else if (res?.statusCode >= 500 || err) {
        return "error";
      }
      return "info";
    },
    serializers: {
      req: (req) => ({ query: req.query, body: req.raw.body }),
      res: (res) => ({ statusCode: res.statusCode }),
    },
    transport: {
      targets: [pinoPrettyConfig, ...(betterstackConfig ? [betterstackConfig] : [])],
    },
  },
};
