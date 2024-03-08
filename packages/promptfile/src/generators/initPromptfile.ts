import { getBaseNameWithoutExtension } from "@montelo/common";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import { PROMPT_EXAMPLE, PROMPT_EXAMPLE_FILE_NAME } from "./example";
import { promptfileToTS } from "./promptfileToTS";
import { getOutput } from "./utils";

export const initPromptfile = async (promptsDirectory: string, outputFilePath: string) => {
  if (existsSync(promptsDirectory)) {
    return;
  }

  const filePath = join(promptsDirectory, PROMPT_EXAMPLE_FILE_NAME);
  mkdirSync(promptsDirectory);
  writeFileSync(filePath, PROMPT_EXAMPLE);

  const fileContent = await readFile(filePath, "utf8");
  const promptName = getBaseNameWithoutExtension(PROMPT_EXAMPLE_FILE_NAME);
  const lineItemTS = promptfileToTS(promptName, fileContent);

  const output = getOutput(lineItemTS);
  writeFileSync(outputFilePath, output);
};
