import { Api } from "./api";
import {
  AddToDatasetInput,
  Configuration,
  CreateDatapointRunInput,
  type CreateDatasetInput,
  CreateExperimentInput,
  DatapointDto,
  DatapointRunDto,
  DatasetDto,
  EventQueuedDto,
  ExperimentDto,
  type LogInput, type PaginatedExperimentWithDatapointsDto,
  type TraceInput,
  UpdateDatapointRunInput,
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
      const datapointRunId = process.env.MONTELO_DATAPOINT_RUN_ID;
      await this.api.log.logsControllerCreateLog({
        createLogInput: {
          log,
          trace: this.trace,
          datapointRunId,
        },
      });
    } catch (e: any) {
      console.error("Montelo Error when creating log: ", e.toString());
    }
  }

  public async createDataset(params: CreateDatasetInput): Promise<DatasetDto | null> {
    try {
      return await this.api.dataset.datasetControllerCreate({
        createDatasetInput: params,
      });
    } catch (e: any) {
      console.error("Montelo Error when creating dataset: ", e.toString());
      return null;
    }
  }

  public async createDatapoint(slug: string, params: AddToDatasetInput): Promise<DatapointDto | null> {
    try {
      return await this.api.datapoint.datapointControllerAddToDatasetBySlug({
        datasetSlug: slug,
        addToDatasetInput: params,
      });
    } catch (e: any) {
      console.error("Montelo Error when creating datapoint: ", e.toString());
      return null;
    }
  }

  public async createExperiment(datasetSlug: string, params: CreateExperimentInput): Promise<ExperimentDto | null> {
    try {
      return await this.api.experiment.experimentControllerCreate({
        datasetSlug,
        createExperimentInput: params,
      });
    } catch (e: any) {
      console.error("Montelo Error when creating experiment: ", e.toString());
      return null;
    }
  }

  public async createDatapointRun(params: CreateDatapointRunInput): Promise<DatapointRunDto | null> {
    try {
      return await this.api.datapointRun.datapointRunControllerCreateDatapointRun({
        createDatapointRunInput: params,
      });
    } catch (e: any) {
      console.error("Montelo Error when creating run: ", e.toString());
      return null;
    }
  }

  public async updateDatapointRun(params: UpdateDatapointRunInput): Promise<EventQueuedDto | null> {
    try {
      return await this.api.datapointRun.datapointRunControllerUpdateDatapointRun({
        updateDatapointRunInput: params,
      });
    } catch (e: any) {
      console.error("Montelo Error when creating run: ", e.toString());
      return null;
    }
  }

  public async getDatapointsByExperimentId(
    experimentId: string,
    options: {
      take: number;
      skip: number;
    },
  ): Promise<PaginatedExperimentWithDatapointsDto | null> {
    try {
      return await this.api.experiment.experimentControllerGetPaginatedDatapointsForExperiment({
        experimentId,
        take: options.take.toString(),
        skip: options.skip.toString(),
      });
    } catch (e: any) {
      console.error("Montelo Error when getting datapoints by experiment id: ", e.toString());
      return null;
    }
  }
}
