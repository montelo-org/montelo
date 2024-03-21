import { Configuration, DatapointApi, DatasetApi, ExperimentApi, LogsApi } from "./client";

export class Api {
  public datapoint: DatapointApi;
  public dataset: DatasetApi;
  public experiment: ExperimentApi;
  public log: LogsApi;

  constructor(configuration: Configuration) {
    this.datapoint = new DatapointApi(configuration);
    this.dataset = new DatasetApi(configuration);
    this.experiment = new ExperimentApi(configuration);
    this.log = new LogsApi(configuration);
  }
}
