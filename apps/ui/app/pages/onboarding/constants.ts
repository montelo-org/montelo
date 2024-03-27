export const MONTELO_CODE_SNIPPET = `import { Montelo } from "montelo";

const montelo = new Montelo();

await montelo.openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: "What is the meaning of life?",
      },
    ]
});
`;

export const ENV_SNIPPET = `MONTELO_API_KEY=your-api-key
OPENAI_API_KEY=your-openai-api-key`;
