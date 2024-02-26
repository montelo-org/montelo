import dotenv from "dotenv";
import { MonteloAI } from "montelo";

dotenv.config();

const montelo = new MonteloAI();

const chat = async (): Promise<void> => {
  const message = "Queen sized inflatable mattress";

  const trace = montelo.startTrace({ name: "MyTrace" });
  trace.log({
    name: "Manual log",
    input: {},
    output: {},
  })

  // some vector db work
  const chunks: Array<string> = [];
  console.log("starting call")
  const writerCompletion = await trace.openai.chat.completions.create({
    name: "Writer",
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content:
          "You write amazon reviews for the user. The user will give you a product, and you will write a one sentence review on it. Here's the catch: I want you to intentionally make spelling errors. Make as many spelling errors as you can.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    stream: true,
  });
  // const writerContent = writerCompletion.choices[0].message.content;
  for await (const chunk of writerCompletion) {
    const content = chunk.choices[0].delta.content;
    chunks.push(content);
  }
  const writerContent = chunks.join("");
  console.log("writerContent: ", writerContent);

  // chat
  const reviewerCompletion = await trace.openai.chat.completions.create({
    name: "Writer / Reviewer",
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content:
          "You are a reviewer of amazon reviews. If there are any spelling errors please fix them. Return the amazon review as is, with only the spelling errors fixed.",
      },
      {
        role: "user",
        content: writerContent,
      },
    ],
    // tools: AllFunctions,
  });

  console.log("reviewerCompletion: ", reviewerCompletion);
};

void chat();
