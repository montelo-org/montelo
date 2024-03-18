import { MonteloClient } from "../MonteloClient";
import { CreateAndRunExperimentinput, CreateExperimentInput, RunExperimentInput } from "./MonteloExperiments.types";

export class MonteloExperiments {
  private readonly monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient) {
    this.monteloClient = monteloClient;
  }

  public async create(params: CreateExperimentInput): Promise<{ id: string | null }> {
    const { slug, ...rest } = params;
    const result = await this.monteloClient.createExperiment(slug, rest);
    return { id: result?.id || null };
  }

  public async run(params: RunExperimentInput): Promise<void> {
    const { experimentId, runner } = params;

    const experiment = await this.monteloClient.getDatapointsByExperimentId(experimentId);
    if (!experiment) {
      console.error("No experiment found, skipping...");
      return;
    }

    const datapoints = experiment.dataset.datapoints;
    for (const datapoint of datapoints) {
      try {
        const output = await runner(datapoint.input);
        await this.monteloClient.createRun({
          experimentId,
          input: datapoint.input,
          output,
        });
        console.log("Run created");
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
      slug: params.slug,
    });
    if (!createdExperiment.id) {
      console.error("No experiment created, skipping run");
      return;
    }

    await this.run({ experimentId: createdExperiment.id, runner: params.runner });
  }
}
