import { MonteloClient } from "../MonteloClient";
import { CreateDatasetInput } from "./MonteloDatasets.types";

export class MonteloDatasets {
  private readonly monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient) {
    this.monteloClient = monteloClient;
  }

  public async create(params: CreateDatasetInput): Promise<{ id: string; slug: string } | null> {
    const result = await this.monteloClient.createDataset(params);
    return result ? { id: result.id, slug: result.slug } : null;
  }
}
