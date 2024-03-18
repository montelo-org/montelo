import dotenv from "dotenv";
import { Montelo } from "montelo";

dotenv.config();

const montelo = new Montelo();

type DInput = { topic: string };
type DOutput = { article: string };

const localDataset: Array<{ input: DInput; output: DOutput }> = [
  {
    input: { topic: "AI in healthcare" },
    output: { article: "Some article about AI in healthcare" },
  },
  { input: { topic: "AI in space" }, output: { article: "Some article about AI in space" } },
];

const main = async () => {
  const dataset = await montelo.datasets.create({
    name: "Topic Datasets",
    inputSchema: {},
    outputSchema: {},
  });

  for (const { input, output } of localDataset) {
    await montelo.datapoints.create({
      datasetId: dataset.id,
      input,
      output,
    });
  }

  await montelo.experiments.createAndRun({
    name: "AI Articles",
    description: "Find articles about AI",
    datasetId: dataset.id,
    runner: openaiChat,
  });
};

const openaiChat = async (input: DInput): Promise<DOutput> => {
  return { article: "Some article about AI in healthcare" };
};

const anthropicChat = async (input: DInput): Promise<DOutput> => {
  return { article: "Some article about AI in healthcare" };
};

void main();
