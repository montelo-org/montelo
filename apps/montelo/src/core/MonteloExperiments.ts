import { MonteloClient } from "../MonteloClient";
import { CreateExperimentInput, RunExperimentInput } from "./MonteloExperiments.types";

export class MonteloExperiments {
  private readonly monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient) {
    this.monteloClient = monteloClient;
  }

  public async create(params: CreateExperimentInput): Promise<{ id: string | null }> {
    const result = await this.monteloClient.createExperiment(params);
    return { id: result?.id || null };
  }

  public async run(params: RunExperimentInput): Promise<void> {
    const { experimentId, runner } = params;

    // TODO fix this
    const dataset = await this.monteloClient.getDatasetWithDatapoints(experimentId);
    if (!dataset) {
      console.error("No dataset found, skipping experiment");
      return;
    }

    const datapoints = dataset.datapoints;
    for (const datapoint of datapoints) {
      try {
        const output = await runner(datapoint.input);
        await this.monteloClient.createRun({
          experimentId,
          input: datapoint.input,
          output,
        });
      } catch (e: any) {
        console.error("Error running experiment: ", e.toString());
        await this.monteloClient.createRun({
          experimentId,
          input: datapoint.input,
          output: { error: e.toString() },
        });
      }
    }
  }

  public async createAndRun(params: CreateExperimentInput & RunExperimentInput): Promise<void> {
    const createdExperiment = await this.create({
      name: params.name,
      description: params.description,
      datasetId: params.datasetId,
    });
    if (!createdExperiment.id) {
      console.error("No experiment created, skipping run");
      return;
    }

    await this.run({ experimentId: createdExperiment.id, runner: params.runner });
  }
}
