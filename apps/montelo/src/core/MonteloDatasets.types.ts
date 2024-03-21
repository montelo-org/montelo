export type SchemaDataType = "string" | "number" | "boolean" | "object" | "array";

export type CreateDatasetInput = {
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
  inputSchema: Record<string, SchemaDataType>;
  /**
   * The output schema of the dataset.
   */
  outputSchema: Record<string, SchemaDataType>;
};
