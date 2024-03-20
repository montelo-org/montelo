import { z } from "zod";

/**
 * Delegate Work
 */
export const DelegateWorkInput = z.object({
  coworker: z.string().describe("Coworker's name to delegate work to."),
  task: z.string().describe("The task to be delegated to the coworker."),
  context: z.string().describe("All necessary context to execute the task."),
});
export type TDelegateWorkInput = z.infer<typeof DelegateWorkInput>;
export const DelegateWorkDescription = (coworkers: string) =>
  `Delegate a specific task to one of the following co-workers: ${coworkers}\nThe input to this tool should be the coworker, the task you want them to do, and ALL necessary context to exectue the task, they know nothing about the task, so share absolute everything you know, don't reference things but instead explain them.`;

/**
 * Ask Question
 */
export const AskQuestionInput = z.object({
  coworker: z.string().describe("Coworker's name to ask the question to."),
  question: z.string().describe("The question to be asked to the coworker."),
  context: z.string().describe("All necessary context to answer the question."),
});
export type TAskQuestionInput = z.infer<typeof AskQuestionInput>;
export const AskQuestionDescription = (coworkers: string) =>
  `Ask a specific question to one of the following co-workers: ${coworkers}\nThe input to this tool should be the coworker, the question you have for them, and ALL necessary context to ask the question properly, they know nothing about the question, so share absolute everything you know, don't reference things but instead explain them.`;
