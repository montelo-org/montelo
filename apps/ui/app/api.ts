import {
  AnalyticsApi,
  ApiKeyApi,
  DatapointApi,
  DatasetApi,
  Configuration,
  EnvironmentApi,
  ExperimentApi,
  LogApi,
  ProjectApi,
  TraceApi,
} from "@montelo/browser-client";

export class Api {
  public readonly analytics: AnalyticsApi;
  public readonly apiKey: ApiKeyApi;
  public readonly datapoint: DatapointApi;
  public readonly dataset: DatasetApi;
  public readonly environment: EnvironmentApi;
  public readonly experiment: ExperimentApi;
  public readonly log: LogApi;
  public readonly project: ProjectApi;
  public readonly trace: TraceApi;

  constructor(configuration: Configuration) {
    this.analytics = new AnalyticsApi(configuration);
    this.apiKey = new ApiKeyApi(configuration);
    this.datapoint = new DatapointApi(configuration);
    this.dataset = new DatasetApi(configuration);
    this.environment = new EnvironmentApi(configuration);
    this.experiment = new ExperimentApi(configuration);
    this.log = new LogApi(configuration);
    this.project = new ProjectApi(configuration);
    this.trace = new TraceApi(configuration);
  }
}
