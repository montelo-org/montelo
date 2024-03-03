import dotenv from "dotenv";
import { Montelo } from "montelo";

dotenv.config();

const montelo = new Montelo();

const chat = async (): Promise<void> => {
  const stream = await montelo.openai.chat.completions.create({
    name: "testing",
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
};

void chat();
