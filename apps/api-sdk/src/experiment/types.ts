import { LogInput, TraceInput } from "../logs/dto/create-log.input";

export enum Queues {
  experiments = "experiments",
}

export type QExperimentInput = {
  envId: string;
  trace?: TraceInput;
  log: LogInput;
};
