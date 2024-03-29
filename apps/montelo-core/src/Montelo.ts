import cuid from "@paralleldrive/cuid2";
import { Log } from "./Log";
import { MonteloClient } from "./MonteloClient";
import { LogInput, LogInputSourceEnum } from "./client";
import { MonteloDatapoints, MonteloDatasets, MonteloExperiments } from "./core";
import { ExtendedAnthropic } from "./extended/ExtendedAnthropic";
import { ExtendedMistral } from "./extended/ExtendedMistral";
import { ExtendedOpenAI } from "./extended/ExtendedOpenAI";
import { MonteloOptions, TraceParams } from "./types";

export type Trace = Omit<Montelo, "startTrace">;

export type LogParams = Omit<LogInput, "name" | "source"> & { name: string };

export class Montelo {
  private readonly constructorOptions: MonteloOptions | undefined;
  private readonly monteloClient: MonteloClient;
  public readonly openai: ExtendedOpenAI;
  public readonly mistral: ExtendedMistral;
  public readonly anthropic: ExtendedAnthropic;
  public readonly datasets: MonteloDatasets;
  public readonly datapoints: MonteloDatapoints;
  public readonly experiments: MonteloExperiments;

  constructor(options?: MonteloOptions) {
    this.constructorOptions = options;
    this.monteloClient = new MonteloClient(options?.montelo);
    this.openai = new ExtendedOpenAI(this.monteloClient, options?.openai);
    this.mistral = new ExtendedMistral(this.monteloClient, options?.mistral);
    this.anthropic = new ExtendedAnthropic(this.monteloClient, options?.anthropic);
    this.datasets = new MonteloDatasets(this.monteloClient);
    this.datapoints = new MonteloDatapoints(this.monteloClient);
    this.experiments = new MonteloExperiments(this.monteloClient);
  }

  public async log(log: LogParams): Promise<Log> {
    const id = cuid.createId();
    const now = new Date().toISOString();
    const startTime = log.startTime || now;
    const endTime = log.endTime || now;
    await this.monteloClient.createLog({ ...log, id, startTime, endTime, source: LogInputSourceEnum.Manual });

    return new Log({ id, monteloClient: this.monteloClient });
  }

  public trace(trace: TraceParams): Trace {
    if (this.monteloClient.getTrace()) {
      throw new Error("Trace already set on this Montelo instance.");
    }
    const newMonteloInstance = new Montelo(this.constructorOptions);
    newMonteloInstance.monteloClient.setTrace({ ...trace, id: cuid.createId() });
    return newMonteloInstance;
  }
}
