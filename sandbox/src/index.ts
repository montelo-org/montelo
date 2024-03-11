import dotenv from "dotenv";
import { Montelo } from "montelo";

dotenv.config();

const montelo = new Montelo();

const chat = async (): Promise<void> => {
  const trace = montelo.trace({ name: "Weather Chat" });

  const messages = [
    {
      role: "user",
      content: "What's the weather like in Boston today?",
    },
  ];
  const tools = [
    {
      type: "function",
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

  const stream = await trace.anthropic.messages.create({
    name: "Outputter",
    model: "claude-3-sonnet-20240229",
    messages: [{ role: "user", content: "say hi" }],
    max_tokens: 100,
    // stream: true,
  });

  // for await (const message of stream) {
  //   console.log(message);
  // }

  // const message1 = response.choices[0].message;
  // console.log(JSON.stringify(message1));
  // const toolCallId = message1.tool_calls[0].id;
  //
  // messages.push(message1);
  //
  // messages.push({
  //   role: "tool",
  //   tool_call_id: toolCallId,
  //   content: "23 degrees Celsius",
  // });
  //
  // const secondResponse = await trace.openai.chat.completions.create({
  //   name: "Weather Chat / Tool Response",
  //   model: "gpt-3.5-turbo",
  //   messages,
  // });
  //
  // console.log(JSON.stringify(secondResponse.choices[0].message));
};

void chat();
