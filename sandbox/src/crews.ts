import { Agent, Crew, Model, Task, Tools } from "@montelo/crews";
import dotenv from "dotenv";
import { Montelo } from "montelo";

dotenv.config();

const main = async () => {
  const monteloClient = new Montelo({
    montelo: { apiKey: process.env.MONTELO_API_KEY },
    openai: { apiKey: process.env.OPENAI_API_KEY },
  });
  const model = new Model({ monteloClient, modelName: "gpt-3.5-turbo" });

  const researcher = new Agent({
    name: "Researcher",
    role: "You're a curious researcher. You love to find and explore the latest trends and news about {topic}.",
    tools: [Tools.GoogleSearchTool],
    model,
  });

  const writer = new Agent({
    name: "Writer",
    role: "You're a passionate blog writer. You write engaging and informative blog posts about {topic}.",
    model,
  });

  const researchTask = new Task({
    name: "Research Topic",
    description: "Identify the latest news and trends about {topic}.",
    expectedOutput: "A summary of all the findings about {topic}.",
    agent: writer,
    allowDelegation: true,
  });

  const crew = new Crew({
    agents: [researcher, writer],
    tasks: [researchTask],
    process: "sequential",
  });

  await crew.start({
    monteloClient,
    promptInputs: { topic: "LLMs" },
  });
};

main();
