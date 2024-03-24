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
  {
    input: { topic: "AI in space" },
    output: { article: "Some article about AI in space" },
  },
  {
    input: { topic: "AI in agriculture" },
    output: { article: "Some article about AI in agriculture" },
  },
  {
    input: { topic: "AI in finance" },
    output: { article: "Some article about AI in finance" },
  },
  {
    input: { topic: "AI in education" },
    output: { article: "Some article about AI in education" },
  },
  {
    input: { topic: "AI in transportation" },
    output: { article: "Some article about AI in transportation" },
  },
  {
    input: { topic: "AI in entertainment" },
    output: { article: "Some article about AI in entertainment" },
  },
];

const main = async () => {
  // const dataset = await montelo.datasets.createProject({
  //   name: "Topic Datasets v2",
  //   description: "Datasets for AI articles v2.",
  //   inputSchema: {
  //     topic: "string",
  //   },
  //   outputSchema: {
  //     article: "string",
  //   },
  // });
  //
  // for (const { input, output } of [...localDataset, ...localDataset, ...localDataset]) {
  //   await montelo.datapoints.createProject({
  //     dataset: dataset.slug,
  //     input,
  //     expectedOutput: output,
  //   });
  // }

  await montelo.experiments.createAndRun({
    name: "AI Articles w/ Anthropic",
    description: "Find articles about AI",
    dataset: "topic-datasets-v2",
    runner: anthropicChat,
  });
};

const openaiChat = async (input: DInput): Promise<DOutput> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const result = await montelo.openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content: "Write a one liner about the given content. Brief and concise.",
      },
      { role: "user", content: `Topic: ${input.topic}` },
    ],
  });
  return { article: result.choices[0].message.content };
};

const anthropicChat = async (input: DInput): Promise<DOutput> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const result = await montelo.anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    messages: [
      {
        role: "user",
        content: `Write a one liner about the given content. Brief and concise.

Topic: ${input.topic}`,
      },
    ],
    max_tokens: 150,
  });
  return { article: result.content[0].text };
};

void main();
