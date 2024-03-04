import dotenv from "dotenv";
import { Montelo } from "montelo";

dotenv.config();

const montelo = new Montelo();

const chat = async (): Promise<void> => {
  const trace = montelo.trace({ name: "wowza" });
  const stream = await trace.openai.chat.completions.create({
    name: "testing",
    model: 'gpt-3.5-turbo-0125',
    messages: [{ role: 'user', content: 'Say this is a testtt' }],
    stream: true,
  });

  for await (const chunk of stream) {
    console.log(chunk.choices[0].delta.content);
  }

  await trace.openai.chat.completions.create({
    name: "testing / nesting",
    model: 'gpt-3.5-turbo-0125',
    messages: [{ role: 'user', content: 'Say this is another test' }],
  })
};

void chat();
