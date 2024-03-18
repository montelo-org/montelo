import { MonteloClient } from "../MonteloClient";
import { CreateDatasetInput } from "./MonteloDatasets.types";

export class MonteloDatasets {
  private readonly monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient) {
    this.monteloClient = monteloClient;
  }

  public async create(params: CreateDatasetInput): Promise<{ id: string | null }> {
    const { envId, ...rest } = params;
    const result = await this.monteloClient.createDataset(envId, rest);
    return { id: result?.id || null };
  }
}
