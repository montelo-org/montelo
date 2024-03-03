import { AUTO_GENERATED_FILE_HEADER } from "@montelo/common";

export const getOutput = (prompts: string) => {
  return `${AUTO_GENERATED_FILE_HEADER}

export const prompts = {
  ${prompts}
};

`;
};
