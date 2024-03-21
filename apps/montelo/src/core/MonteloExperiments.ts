import { MonteloClient } from "../MonteloClient";
import { CreateAndRunExperimentInput, CreateExperimentInput, RunExperimentInput } from "./MonteloExperiments.types";

export class MonteloExperiments {
  private readonly monteloClient: MonteloClient;

  constructor(monteloClient: MonteloClient) {
    this.monteloClient = monteloClient;
  }

  public async create(params: CreateExperimentInput): Promise<{ id: string | null }> {
    const { dataset, ...rest } = params;
    const result = await this.monteloClient.createExperiment(dataset, rest);
    return { id: result?.id || null };
  }

  public async run(params: RunExperimentInput): Promise<void> {
    const { experimentId, runner } = params;

    try {
      process.env.MONTELO_EXPERIMENT_ID = experimentId;

      // TODO: this should be paginated
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
        } catch (e: any) {
          console.error(`Error running datapoint ${datapoint.id}: `, e.toString());
          await this.monteloClient.createRun({
            experimentId,
            input: datapoint.input,
            output: { error: e.toString() },
          });
        }
      }
    } catch (e: any) {
      console.error("Error running experiment: ", e.toString());
    } finally {
      delete process.env.MONTELO_EXPERIMENT_ID;
    }
  }

  public async createAndRun(params: CreateAndRunExperimentInput): Promise<void> {
    const createdExperiment = await this.create({
      name: params.name,
      description: params.description,
      dataset: params.dataset,
    });
    if (!createdExperiment.id) {
      console.error("No experiment created, skipping run");
      return;
    }

    await this.run({ experimentId: createdExperiment.id, runner: params.runner });
  }
}
