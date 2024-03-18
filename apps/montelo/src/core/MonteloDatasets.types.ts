export type CreateDatasetInput = {
  /**
   * The environment id.
   */
  envId: string;
  /**
   * The name of the dataset.
   */
  name: string;
  /**
   * The description of the dataset.
   */
  description?: string;
  /**
   * The input schema of the dataset.
   */
  inputSchema: Record<string, any>;
  /**
   * The output schema of the dataset.
   */
  outputSchema: Record<string, any>;
}