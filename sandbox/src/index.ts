import dotenv from "dotenv";
import { Montelo } from "montelo";

dotenv.config();

const montelo = new Montelo();

const chat = async (): Promise<void> => {
  const trace = montelo.trace({ name: "Weather Chat" });

  const tools = [
    {
      type: "function" as const,
      function: {
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city and state, e.g. San Francisco, CA",
            },
            unit: { type: "string", enum: ["celsius", "fahrenheit"] },
          },
          required: ["location"],
        },
      },
    },
  ];

  await trace.log({ name: "Weather Agent" });

  await trace.anthropic.messages.create({
    name: "Weather Agent / Action 1",
    model: "claude-3-sonnet-20240229",
    messages: [{ role: "user", content: "say hi" }],
    max_tokens: 100,
  });

  await trace.mistral.chat({
    name: "Weather Agent / Action 2",
    model: "mistral-tiny",
    messages: [{ role: "user", content: "say hi" }],
  });

  await trace.openai.chat.completions.create({
    name: "Weather Agent / Action 3",
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "what's the weather today in toronto" }],
    tools,
  });
};

void chat();
