type OpenAIRole = "system" | "user";

type MonteloModels = "System" | "User";

type ModelContent = {
  model: MonteloModels;
  content: string;
  variables: string[];
};

const ModelToRole: Record<MonteloModels, OpenAIRole> = {
  User: "user",
  System: "system",
};

const extractTagContent = (input: string): ModelContent[] => {
  const tagRegex = /<(System|User)>(.*?)<\/\1>/gs;
  const variableRegex = /\{\{(.*?)}}/g;
  const results: ModelContent[] = [];

  let match: RegExpExecArray | null;
  // Iterate over all matches
  while ((match = tagRegex.exec(input)) !== null) {
    const model = match[1];
    const content = match[2];
    if (model !== "System" && model !== "User") {
      throw new Error(`Invalid model: ${model}`);
    }

    const variables: string[] = [];
    // Extract variables from content and replace them
    const updatedContent = content
      .replace(variableRegex, (_, variableName) => {
        if (!variables.includes(variableName)) {
          variables.push(variableName);
        }
        return `\${${variableName}}`;
      })
      .trim();

    results.push({
      model,
      content: updatedContent,
      variables,
    });
  }

  return results;
};

export const promptfileToTS = (fileName: string, fileContent: string): string => {
  const extractedContents = extractTagContent(fileContent);

  const messages = extractedContents.map(({ model, content }) => ({
    role: ModelToRole[model],
    content,
  }));

  const functionParams = extractedContents.map(({ variables }) => variables).flat();
  const joinedParams = functionParams.join(", ");
  const joinedTypedParams = functionParams.map((param) => `${param}: string`).join(", ");

  const stringifiedMessages = messages
    .map((message) => `{ role: "${message.role}", content: \`${message.content}\` }`)
    .join(",\n");

  return `${fileName}: ({ ${joinedParams} }: { ${joinedTypedParams} }) => [${stringifiedMessages}],\n`;
};
