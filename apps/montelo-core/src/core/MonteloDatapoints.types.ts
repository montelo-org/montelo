export type CreateDatapointInput = {
  /**
   * The dataset slug.
   */
  dataset: string;
  /**
   * The input data for the datapoint
   */
  input: Record<string, any>;
  /**
   * The expected output data for the datapoint
   */
  expectedOutput: Record<string, any>;
};
