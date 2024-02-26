import { LogTypes } from "@montelo/db";
import cuid from "cuid";

import { MonteloClient } from "./MonteloClient";
import { LogInput } from "./client";
import { ExtendedOpenAI } from "./extended/ExtendedOpenAI";
import { MonteloOptions, TraceParams } from "./types";

export type Trace = Omit<MonteloAI, "startTrace">;

export class MonteloAI {
  private readonly constructorOptions: MonteloOptions | undefined;
  private readonly monteloClient: MonteloClient;
  public readonly openai: ExtendedOpenAI;

  constructor(options?: MonteloOptions) {
    this.constructorOptions = options;
    this.monteloClient = new MonteloClient(options?.montelo);
    this.openai = new ExtendedOpenAI(this.monteloClient, options?.openai);
  }

  public log(log: Omit<LogInput, "type">) {
    void this.monteloClient.createLog({ ...log, type: LogTypes.MANUAL });
  }

  public startTrace(trace: TraceParams): Trace {
    const newMonteloInstance = new MonteloAI(this.constructorOptions);
    newMonteloInstance.monteloClient.setTrace({ ...trace, id: cuid() });
    return newMonteloInstance;
  }
}
