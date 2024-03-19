import { Agent, Crew, Model, Task, Tool } from "@montelo/crews";
import dotenv from "dotenv";
import { Montelo } from "montelo";
import { z } from "zod";

dotenv.config();

/**
 * TOOLS
 */
const FunctionInput = z.object({
  setup: z
    .string()
    .describe("The part of a joke that establishes the context and prepares the audience for the punchline."),
  punchline: z
    .string()
    .describe("The conclusion of a joke that delivers the humor, often through an unexpected twist or revelation."),
});
type TFunctionInput = z.infer<typeof FunctionInput>;

const formatJoke = async (params: TFunctionInput): Promise<string> =>
  `Setup:\n${params.setup}\n\nPunchline:\n${params.punchline}`;

const formatJokeTool = new Tool({
  name: "formatJoke",
  function: formatJoke,
  description: "Format a pre-written joke with a setup and punchline.",
  schema: FunctionInput,
});

/**
 * MAIN
 */

const main = async () => {
  const monteloClient = new Montelo({
    montelo: { apiKey: process.env.MONTELO_API_KEY },
    openai: { apiKey: process.env.OPENAI_API_KEY },
  });
  const model = new Model({ monteloClient, modelName: "gpt-3.5-turbo" });

  const comedian = new Agent({
    name: "Comedian",
    role: "You're a stand-up comedian. You're known for your quick wit and ability to make people laugh.",
    model,
  });
  const reviewer = new Agent({
    name: "Reviewer",
    role: "You're a critic. You're known for your ability to critique and analyze jokes.",
    model,
  });

  const task1 = new Task({
    name: "Write Joke",
    description: "Write a joke about {topic}",
    expectedOutput: `a short funny joke`,
    agent: comedian,
    tools: [formatJokeTool],
  });
  const task2 = new Task({
    name: "Score Joke",
    description: "review the joke and score it out of 10.",
    expectedOutput: "Score: <only the number 1-10>\nReview: <a short review of the joke>",
    agent: reviewer,
  });
  const crew = new Crew({ tasks: [task1, task2], process: "sequential" });

  crew.start({ monteloClient, promptInputs: { topic: "cats" } });
  // console.log(comedian, crew, task);
};

main();
