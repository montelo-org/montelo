import { LogSources } from "@montelo/db";
import cuid from "cuid";

import { MonteloClient } from "./MonteloClient";
import { LogInput } from "./client";
import { ExtendedMistral } from "./extended/ExtendedMistral";
import { ExtendedOpenAI } from "./extended/ExtendedOpenAI";
import { MonteloOptions, TraceParams } from "./types";

export type Trace = Omit<Montelo, "startTrace">;

export type LogParams = Omit<LogInput, "type">;

export class Montelo {
  private readonly constructorOptions: MonteloOptions | undefined;
  private readonly monteloClient: MonteloClient;
  public readonly openai: ExtendedOpenAI;
  public readonly mistral: ExtendedMistral;

  constructor(options?: MonteloOptions) {
    this.constructorOptions = options;
    this.monteloClient = new MonteloClient(options?.montelo);
    this.openai = new ExtendedOpenAI(this.monteloClient, options?.openai);
    this.mistral = new ExtendedMistral(this.monteloClient, options?.mistral);
  }

  public log(log: LogParams) {
    void this.monteloClient.createLog({ ...log, source: LogSources.MANUAL });
  }

  public trace(trace: TraceParams): Trace {
    if (this.monteloClient.getTrace()) {
      throw new Error("Trace already set on this Montelo instance.");
    }
    const newMonteloInstance = new Montelo(this.constructorOptions);
    newMonteloInstance.monteloClient.setTrace({ ...trace, id: cuid() });
    return newMonteloInstance;
  }
}
