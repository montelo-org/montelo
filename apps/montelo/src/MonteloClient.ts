import { Api } from "./api";
import { Configuration, type LogInput, type TraceInput } from "./client";
import { MonteloClientOptions } from "./types";

export class MonteloClient {
  private api: Api;
  private trace: TraceInput | undefined;

  constructor(options?: MonteloClientOptions) {
    const apiKey = options?.apiKey || process.env.MONTELO_API_KEY;
    if (!apiKey) {
      throw new Error("Montelo API key not set.");
    }
    const baseUrl = options?.baseUrl || process.env.MONTELO_BASE_URL || "https://logs.montelo.ai";

    const configuration = new Configuration({
      basePath: baseUrl,
      accessToken: apiKey,
    });
    this.api = new Api(configuration);
  }

  public async createLog(log: LogInput): Promise<void> {
    try {
      await this.api.log().logsControllerCreateLog({
        createLogInput: {
          log,
          trace: this.trace,
        },
      });
    } catch (e: any) {
      console.error("Montelo Error when creating log: ", e.toString());
    }
  }

  public setTrace(trace: TraceInput) {
    this.trace = trace;
  }

  public getTrace() {
    return this.trace;
  }
}
