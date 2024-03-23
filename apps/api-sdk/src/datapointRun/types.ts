export enum Queues {
  datapointRun = "datapointRun",
}

export type QExperimentInput = {
  datapointRunId: string;
  output: Record<string, any>;
};
