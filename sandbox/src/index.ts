import dotenv from "dotenv";
import { Montelo } from "montelo";

dotenv.config();

const montelo = new Montelo();

const chat = async (): Promise<void> => {
  const stream = await montelo.openai.chat.completions.create({
    name: "Image",
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "What is this image about? Be brief and concise.",
          },
          {
            type: "image_url",
            image_url: {
              url: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Bucephala-albeola-010.jpg",

            },
          },
        ],
      },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    console.log(chunk.choices[0].delta.content);
  }
};

void chat();
