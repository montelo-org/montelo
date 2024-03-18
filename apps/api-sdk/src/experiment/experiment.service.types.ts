export type CreateExperimentParams = {
  datasetId: string;
  name: string;
  description: string | null;
}

export type CreateRunParams = {
  experimentId: string;
  input: Record<string, any>;
  output: Record<string, any>;
}