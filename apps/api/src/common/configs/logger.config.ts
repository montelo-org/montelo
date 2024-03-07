import { Params } from 'nestjs-pino';

export const loggerConfig: Params = {
  pinoHttp: {
    customReceivedMessage: (req, res) => `Incoming Request: ${req.method} "${req.url}"`,
    customSuccessMessage: (req, res) => `Request Completed: ${req.method} "${req.url}"`,
    customErrorMessage: (req, res) => `Request Failed: ${req.method} "${req.url}"`,
    customLogLevel: function (req, res, err) {
      if (res?.statusCode >= 400 && res.statusCode < 500) {
        return 'warn';
      } else if (res?.statusCode >= 500 || err) {
        return 'error';
      }
      return 'info';
    },
    serializers: {
      req: (req) => ({ query: req.query, body: req.raw.body }),
      res: (res) => ({ statusCode: res.statusCode }),
    },
    transport: { target: 'pino-pretty' },
  },
};