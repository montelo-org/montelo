export type CreateExperimentInput = {
  /**
   * The dataset slug to which the experiment belongs.
   */
  dataset: string;
  /**
   * The name of the experiment.
   */
  name: string;
  /**
   * The description of the experiment.
   */
  description?: string;
};

export type RunExperimentInput = {
  /**
   * The dataset ID to run.
   */
  experimentId: string;
  /**
   * The runner function to run the experiment.
   */
  runner: (params: Record<string, any>) => Promise<Record<string, any>>;
};

export type CreateAndRunExperimentInput = CreateExperimentInput & Omit<RunExperimentInput, "experimentId">;
