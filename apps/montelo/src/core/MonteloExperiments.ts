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
      const options = {
        take: 100,
        skip: 0,
      };

      let hasMoreDatapoints = true;
      let datapointsProcessed = 0;
      while (hasMoreDatapoints) {
        const response = await this.monteloClient.getDatapointsByExperimentId(experimentId, options);
        if (!response) {
          console.error("No experiment found, returning...");
          return;
        }
        const { experiment, totalDatapoints } = response;

        const datapoints = experiment.dataset.datapoints;
        for (const datapoint of datapoints) {
          try {
            const percent = Math.floor((datapointsProcessed / totalDatapoints) * 100);
            console.log(`Running datapoint ${datapoint.id}\tProgress ${datapointsProcessed + 1}/${totalDatapoints}\t${percent}%`);
            const datapointRunObj = await this.monteloClient.createDatapointRun({
              datapointId: datapoint.id,
              experimentId,
            });
            if (!datapointRunObj) {
              throw new Error("Error creating datapoint run");
            }

            process.env.MONTELO_DATAPOINT_RUN_ID = datapointRunObj.id;
            const output = await runner(datapoint.input);

            await this.monteloClient.updateDatapointRun({
              datapointRunId: datapointRunObj.id,
              output,
            });

            datapointsProcessed++;
          } catch (e: any) {
            console.error(`Error running datapoint ${datapoint.id}: `, e.toString());
            // TODO should still add to db
          }
        }

        options.skip += options.take;
        hasMoreDatapoints = options.skip < totalDatapoints;
      }

      // TODO add link here to the experiment page!
      console.log("Experiment completed successfully!");
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
      console.error("Error creating experiment, returning...");
      return;
    }

    await this.run({ experimentId: createdExperiment.id, runner: params.runner });
  }
}
