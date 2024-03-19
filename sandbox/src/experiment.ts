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
];

const main = async () => {
  const dataset = await montelo.datasets.create({
    name: "Topic Datasets",
    description: "Datasets for AI articles.",
    inputSchema: {},
    outputSchema: {},
  });

  for (const { input, output } of localDataset) {
    await montelo.datapoints.create({
      dataset: dataset.slug,
      input,
      output,
    });
  }

  await montelo.experiments.createAndRun({
    name: "AI Articles Anthropic",
    description: "Find articles about AI",
    dataset: "topic-datasets",
    runner: anthropicChat,
  });
};

const openaiChat = async (input: DInput): Promise<DOutput> => {
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
