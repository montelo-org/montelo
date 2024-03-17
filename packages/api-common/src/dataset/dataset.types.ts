export type CreateDatasetParams = {
  name: string;
  description: string | null;
  envId: string;
  inputSchema: any;
  outputSchema: any;
};
