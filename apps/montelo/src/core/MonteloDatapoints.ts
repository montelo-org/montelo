import { MonteloClient } from "../MonteloClient";
import { CreateDatapointInput } from "./MonteloDatapoints.types";

export class MonteloDatapoints {
  private readonly monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient) {
    this.monteloClient = monteloClient;
  }

  public async create(params: CreateDatapointInput): Promise<{ id: string } | null> {
    const { slug, ...rest } = params;
    const result = await this.monteloClient.createDatapoint(slug, rest);
    return result ? { id: result.id } : null;
  }
}
