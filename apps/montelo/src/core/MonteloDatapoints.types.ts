export type CreateDatapointInput = {
  /**
   * The dataset slug.
   */
  slug: string;
  /**
   * The input data for the datapoint
   */
  input: Record<string, any>;
  /**
   * The output data for the datapoint
   */
  output: Record<string, any>;
};