import * as fs from "fs";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { z } from "zod";
import { CONFIG_FILE_NAME } from "./constants";

export const MonteloConfigSchema = z.object({
  functions: z.object({
    directory: z.string().min(1),
    output: z.string().min(1),
  }),
  prompts: z.object({
    directory: z.string().min(1),
    output: z.string().min(1),
  }),
});

export type MonteloConfig = z.infer<typeof MonteloConfigSchema>;

export const getConfigPath = (): string => {
  // User's current working directory
  const root = process.cwd();
  // Config file path (always in the root directory of the project)
  return join(root, CONFIG_FILE_NAME);
};

export const readMonteloConfig = (): MonteloConfig => {
  const configPath = getConfigPath();
  if (!existsSync(configPath)) {
    console.error(`${configPath} does not exist.`);
    process.exit(1);
  }

  const configContent = readFileSync(configPath, "utf8");
  const config = JSON.parse(configContent);
  return MonteloConfigSchema.parse(config);
};

export const createDefaultMonteloConfig = (path: string): MonteloConfig => {
  if (existsSync(path)) {
    throw new Error(`${path} already exists.`);
  }

  const config: MonteloConfig = {
    functions: {
      directory: "./src/functions",
      output: "./src/functions/functions.montelo.ts",
    },
    prompts: {
      directory: "./src/prompts",
      output: "./src/prompts/prompts.montelo.ts",
    },
  };
  const configContent = JSON.stringify(config, null, 2);
  fs.writeFileSync(path, configContent);
  return config;
};
