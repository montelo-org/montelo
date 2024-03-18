import { MonteloClient } from "../MonteloClient";
import { CreateAndRunExperimentinput, CreateExperimentInput, RunExperimentInput } from "./MonteloExperiments.types";

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
    console.log("Running experiment");
    const { experimentId, runner } = params;

    const experiment = await this.monteloClient.getDatapointsByExperimentId(experimentId);
    if (!experiment) {
      console.error("No experiment found, skipping...");
      return;
    }

    console.log("Experiment found: ", experiment.name);

    const datapoints = experiment.dataset.datapoints;
    console.log("Running datapoints: ", datapoints.length)
    for (const datapoint of datapoints) {
      console.log("Running datapoint: ", datapoint.input)
      try {
        const output = await runner(datapoint.input);
        console.log("Output: ", output)
        await this.monteloClient.createRun({
          experimentId,
          input: datapoint.input,
          output,
        });
        console.log("Run created")
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

  public async createAndRun(params: CreateAndRunExperimentinput): Promise<void> {
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
