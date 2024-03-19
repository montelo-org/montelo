export const ExpectedOutputPrompt = (expectedOutput: string) =>
  `\nThis is the expected criteria for your final answer:\n${expectedOutput}`;

export const TaskWithContextPrompt = (task: string, context: any) =>
  `${task}\n\nThis is the context you're working with:\n${context}`;
