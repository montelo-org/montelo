import dotenv from "dotenv";
import { Agent, Crew, Model, Montelo, Task, Tools } from "montelo";

dotenv.config();

const main = async () => {
  const monteloClient = new Montelo();
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
    agent: researcher,
    allowDelegation: true,
    callback: async () => {
      console.log("[ResearchTask] Task Done!");
    },
  });

  const writeTask = new Task({
    name: "Write Blog Post",
    description: "Write an engaging and informative blog post about {topic}.",
    expectedOutput: "A structured blog post with clear subheadings and optimized with keywords for SEO.",
    agent: writer,
  });

  const crew = new Crew({
    name: "Blog Post Crew",
    agents: [researcher, writer],
    tasks: [researchTask, writeTask],
    process: "sequential",
    stepCallback: async (_, agentName) => {
      console.log(`[${agentName}] Agent Done!`);
    },
  });

  await crew.start({
    monteloClient,
    promptInputs: { topic: "LLMs" },
  });
};

void main();
