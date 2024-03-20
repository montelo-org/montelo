export const ExpectedOutputPrompt = (expectedOutput: string) =>
  `\n# This is the expected criteria and format for your final answer:\n${expectedOutput}`;

export const TaskWithContextPrompt = (task: string, context: any) =>
  `${task}\n\n# This is the context you're working with:\n${context}`;
