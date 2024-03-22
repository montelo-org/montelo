import { Configuration, DatapointApi, DatasetApi, ExperimentApi, LogsApi, DatapointRunApi } from "./client";

export class Api {
  public datapoint: DatapointApi;
  public datapointRun: DatapointRunApi;
  public dataset: DatasetApi;
  public experiment: ExperimentApi;
  public log: LogsApi;

  constructor(configuration: Configuration) {
    this.datapoint = new DatapointApi(configuration);
    this.datapointRun = new DatapointRunApi(configuration);
    this.dataset = new DatasetApi(configuration);
    this.experiment = new ExperimentApi(configuration);
    this.log = new LogsApi(configuration);
  }
}
