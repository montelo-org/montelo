import { createId } from "@paralleldrive/cuid2";
import { MonteloClient } from "./MonteloClient";
import { LogInput } from "./client";
import { ExtendedMistral } from "./extended/ExtendedMistral";
import { ExtendedOpenAI } from "./extended/ExtendedOpenAI";
import { MonteloOptions, TraceParams } from "./types";


// import { ExtendedAnthropic } from "./extended/ExtendedAnthropic";

export type Trace = Omit<Montelo, "startTrace">;

export type LogParams = Omit<LogInput, "source">;

export class Montelo {
  private readonly constructorOptions: MonteloOptions | undefined;
  private readonly monteloClient: MonteloClient;
  public readonly openai: ExtendedOpenAI;
  public readonly mistral: ExtendedMistral;

  // public readonly anthropic: ExtendedAnthropic;

  constructor(options?: MonteloOptions) {
    this.constructorOptions = options;
    this.monteloClient = new MonteloClient(options?.montelo);
    this.openai = new ExtendedOpenAI(this.monteloClient, options?.openai);
    this.mistral = new ExtendedMistral(this.monteloClient, options?.mistral);

    // this.anthropic = new ExtendedAnthropic(this.monteloClient, options?.anthropic);
  }

  public log(log: LogParams) {
    void this.monteloClient.createLog({ ...log, source: "MANUAL" });
  }

  public trace(trace: TraceParams): Trace {
    if (this.monteloClient.getTrace()) {
      throw new Error("Trace already set on this Montelo instance.");
    }
    const newMonteloInstance = new Montelo(this.constructorOptions);
    newMonteloInstance.monteloClient.setTrace({ ...trace, id: createId() });
    return newMonteloInstance;
  }
}
