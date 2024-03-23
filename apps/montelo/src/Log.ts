import { MonteloClient } from "./MonteloClient";
import { EndLogInput } from "./client";

export class Log {
  private readonly id: string;
  private readonly monteloClient: MonteloClient;

  constructor({ id, monteloClient }: { id: string; monteloClient: MonteloClient }) {
    this.id = id;
    this.monteloClient = monteloClient;
  }

  public async end(updatePayload: EndLogInput) {
    await this.monteloClient.endLog(this.id, updatePayload);
  }
}
