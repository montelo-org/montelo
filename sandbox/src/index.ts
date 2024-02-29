import dotenv from "dotenv";
import { MonteloAI } from "montelo";

dotenv.config();

const montelo = new MonteloAI();

const chat = async (): Promise<void> => {
  const trace = montelo.startTrace({ name: "Researcher" });

  await trace.openai.chat.completions.create({
    name: "Slack Agent",
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "user",
        content: "Say hello",
      },
    ],
  });

  await trace.openai.chat.completions.create({
    name: "Slack Agent / Write Message",
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content: "You are tasked with writing message to the given Slack channel."
      },
      {
        role: "user",
        content: "Slack channel: #devs\n\nSearch results: ...",
      },
    ],
  });

  await trace.openai.chat.completions.create({
    name: "Slack Agent / Send Message",
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "user",
        content: "Say hello",
      },
    ],
  });

};

void chat();
