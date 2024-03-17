import {
  AnalyticsApi,
  ApiKeyApi,
  Configuration,
  EnvironmentApi,
  LogApi,
  ProjectApi,
  TraceApi,
} from "@montelo/browser-client";

export class Api {
  public readonly analytics: AnalyticsApi;
  public readonly apiKey: ApiKeyApi;
  public readonly environment: EnvironmentApi;
  public readonly log: LogApi;
  public readonly project: ProjectApi;
  public readonly trace: TraceApi;

  constructor(configuration: Configuration) {
    this.analytics = new AnalyticsApi(configuration);
    this.apiKey = new ApiKeyApi(configuration);
    this.environment = new EnvironmentApi(configuration);
    this.log = new LogApi(configuration);
    this.project = new ProjectApi(configuration);
    this.trace = new TraceApi(configuration);
  }
}
