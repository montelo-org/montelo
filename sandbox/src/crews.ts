import { Agent, Crew, OpenAIModelProvider, Task } from "@montelo/crews";
import dotenv from "dotenv";
import { Montelo } from "montelo";

dotenv.config();

const main = async () => {
  const monteloClient = new Montelo({
    montelo: { apiKey: process.env.MONTELO_API_KEY },
    openai: { apiKey: process.env.OPENAI_API_KEY },
  });

  const modelProvider = new OpenAIModelProvider({
    //Remove this
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo",
  });

  const comedian = new Agent({
    name: "Comedian",
    role: "You're a stand-up comedian. You're known for your quick wit and ability to make people laugh.",
    systemMessage: "Write a short hilarious joke about {topic}.",
    modelProvider,
  });
  const reviewer = new Agent({
    name: "Reviewer",
    role: "You're a critic. You're known for your ability to critique and analyze jokes.",
    modelProvider,
  });

  const task1 = new Task({
    name: "Write Joke",
    description: "Write a Joke about {topic}",
    expectedOutput: "a short funny joke",
    agent: comedian,
  });
  const task2 = new Task({
    name: "Review Joke",
    description: "Review the joke",
    expectedOutput: "review of the joke",
    agent: reviewer,
  });
  const crew = new Crew({ tasks: [task1, task2], process: "sequential" });

  crew.start({ monteloClient, promptInputs: { topic: "cats" } });
  // console.log(comedian, crew, task);
};

main();
