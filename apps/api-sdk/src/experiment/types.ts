export enum Queues {
  experiments = "experiments",
}

export type QExperimentInput = {
  experimentId: string;
  input: Record<string, any>;
  output: Record<string, any>;
};
