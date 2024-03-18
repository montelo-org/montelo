import { MonteloClient } from "../MonteloClient";
import { CreateDatapointInput } from "./MonteloDatapoints.types";

export class MonteloDatapoints {
  private readonly monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient) {
    this.monteloClient = monteloClient;
  }

  public async create(params: CreateDatapointInput): Promise<{ id: string | null }> {
    const { datasetId, ...rest } = params;
    const result = await this.monteloClient.createDatapoint(datasetId, rest);
    return { id: result?.id || null };
  }
}
