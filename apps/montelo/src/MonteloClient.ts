import { Api } from "./api";
import {
  AddToDatasetInput,
  Configuration,
  type CreateDatasetInput,
  CreateExperimentInput,
  CreateRunInput,
  DatapointDto,
  DatasetDto,
  ExperimentDto,
  FullDatasetDto,
  FullExperimentDto,
  type LogInput,
  type TraceInput,
} from "./client";
import { MonteloClientOptions } from "./types";

export class MonteloClient {
  private api: Api;
  private trace: TraceInput | undefined;

  constructor(options?: MonteloClientOptions) {
    const apiKey = options?.apiKey || process.env.MONTELO_API_KEY;
    if (!apiKey) {
      throw new Error("Montelo API key not set.");
    }
    const baseUrl = options?.baseUrl || process.env.MONTELO_BASE_URL || "https://api-sdk.montelo.ai";

    const configuration = new Configuration({
      basePath: baseUrl,
      accessToken: apiKey,
    });
    this.api = new Api(configuration);
  }

  public setTrace(trace: TraceInput) {
    this.trace = trace;
  }

  public getTrace() {
    return this.trace;
  }

  public async createLog(log: LogInput): Promise<void> {
    try {
      await this.api.log.logsControllerCreateLog({
        createLogInput: {
          log,
          trace: this.trace,
        },
      });
    } catch (e: any) {
      console.error("Montelo Error when creating log: ", e.toString());
    }
  }

  public async createDataset(envId: string, params: CreateDatasetInput): Promise<DatasetDto | null> {
    try {
      return await this.api.dataset.datasetControllerCreate({
        envId,
        createDatasetInput: params,
      });
    } catch (e: any) {
      console.error("Montelo Error when creating dataset: ", e.toString());
      return null;
    }
  }

  public async getDatasetWithDatapoints(datasetId: string): Promise<FullDatasetDto | null> {
    try {
      return await this.api.dataset.datasetControllerGetFullDataset({
        datasetId,
        envId: "", // This isn't used in the API. figure out better way to handle this
      });
    } catch (e: any) {
      console.error("Montelo Error when getting dataset with datapoints: ", e.toString());
      return null;
    }
  }

  public async createDatapoint(datasetId: string, params: AddToDatasetInput): Promise<DatapointDto | null> {
    try {
      return await this.api.datapoint.datapointControllerAddToDataset({
        datasetId,
        addToDatasetInput: params,
      });
    } catch (e: any) {
      console.error("Montelo Error when creating datapoint: ", e.toString());
      return null;
    }
  }

  public async createExperiment(params: CreateExperimentInput): Promise<ExperimentDto | null> {
    try {
      return await this.api.experiment.experimentControllerCreate({
        createExperimentInput: params,
      });
    } catch (e: any) {
      console.error("Montelo Error when creating experiment: ", e.toString());
      return null;
    }
  }

  public async createRun(params: CreateRunInput): Promise<{ success: boolean }> {
    try {
      return await this.api.experiment.experimentControllerRun({
        createRunInput: params,
      });
    } catch (e: any) {
      console.error("Montelo Error when creating run: ", e.toString());
      return { success: false };
    }
  }

  public async getDatapointsByExperimentId(experimentId: string): Promise<FullExperimentDto | null> {
    try {
      return await this.api.experiment.experimentControllerGetFullExperiment({
        experimentId,
      });
    } catch (e: any) {
      console.error("Montelo Error when getting datapoints by experiment id: ", e.toString());
      return null;
    }
  }
}
