import { Configuration, LogsApi } from "./client";

export class Api {
  public readonly log: LogsApi;

  constructor(configuration: Configuration) {
    this.log = new LogsApi(configuration);
  }
}
