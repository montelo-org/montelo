import dotenv from "dotenv";
import { Montelo } from "montelo";

dotenv.config();

const montelo = new Montelo();

const chat = async (): Promise<void> => {
  const trace = montelo.trace({ name: "Sample Trace" });

  await trace.log({ name: "Sample Trace" });

  await trace.anthropic.messages.create({
    name: "Sample Trace / Action 1",
    model: "claude-3-sonnet-20240229",
    messages: [{ role: "user", content: "Tell me a joke about the person reading this." }],
    max_tokens: 100,
  });

  await trace.mistral.chat({
    name: "Sample Trace / Action 2",
    model: "mistral-tiny",
    messages: [{ role: "user", content: "Tell me a joke about the person reading this." }],
  });

  await trace.openai.chat.completions.create({
    name: "Sample Trace / Action 3",
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Tell me a joke about the person reading this." }],
  });
};

void chat();
