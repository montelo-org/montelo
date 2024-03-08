import async from "async";
import { sync } from "fast-glob";
import { readFile } from "fs/promises";
import { parse } from "path";
import { promptfileToTS } from "./promptfileToTS";
import { getOutput } from "./utils";

export const generatePromptfile = async (pathToUserPromptsDir: string): Promise<string> => {
  // All the prompts are stored in the prompts directory + subdirectories
  const userPromptFiles = sync(`${pathToUserPromptsDir}/**/*.prompt`);
  // maps the file name to a function that returns the file content (for now)
  let promptTSEntries = "";

  await async.eachLimit(userPromptFiles, 5, async (file) => {
    try {
      // Read the file content as a string
      const fileContent = await readFile(file, "utf8");

      // Extract file name without extension
      const { name } = parse(file);

      const ts = promptfileToTS(name, fileContent);
      promptTSEntries += ts;
    } catch (e) {
      console.error(e);
      throw new Error(`Error reading ${file}: ${e}`);
    }
  });

  return getOutput(promptTSEntries);
};
