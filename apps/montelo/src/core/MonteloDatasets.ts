import { MonteloClient } from "../MonteloClient";
import { CreateDatasetInput } from "./MonteloDatasets.types";

export class MonteloDatasets {
  private readonly monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient) {
    this.monteloClient = monteloClient;
  }

  public async create(params: CreateDatasetInput): Promise<{ id: string | null }> {
    // TODO get somehow from api key env
    const result = await this.monteloClient.createDataset("cltnraee700031wspszwdp4nm", params);
    return { id: result?.id || null };
  }
}
