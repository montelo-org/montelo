import { generateId, injectParameters } from "../utils";
import type { TaskConstructor, TaskExecuteParams, TaskInterface } from "./Task.interface";
import { ExpectedOutputPrompt, TaskWithContextPrompt } from "./Task.prompts";

export class Task implements TaskInterface {
  public readonly id: TaskInterface["id"];
  public readonly name: TaskInterface["name"];
  public readonly agent: TaskInterface["agent"];
  public description: TaskInterface["description"];
  public expectedOutput: TaskInterface["expectedOutput"];
  public tools: TaskInterface["tools"];

  constructor({ name, description, agent, expectedOutput, tools }: TaskConstructor) {
    this.id = generateId("task");
    this.name = name;
    this.description = description;
    this.agent = agent;
    this.expectedOutput = expectedOutput;
    this.tools = tools;
  }

  public async injectInputsIntoPrompt(promptInputs: Record<string, any>): Promise<void> {
    this.description = injectParameters(this.description, promptInputs);
    this.expectedOutput = injectParameters(this.expectedOutput, promptInputs);
  }

  public async execute({ agent, context, tools, trace }: TaskExecuteParams): Promise<string> {
    // If Sequential, agent has to be defined on the task. If manager controlled then agent and tools have to be passed in
    agent = agent || this.agent;
    if (!agent) {
      throw new Error("No agent assigned for this task: " + this.description);
    }
    tools = tools?.length ? tools : this.tools;

    return await agent.executeTask({
      task: this,
      context,
      tools,
      trace,
    });
  }

  public getName(): string {
    return `Task: ${this.name}`;
  }

  public getPrompt(context?: any): string {
    const taskPrompt = this.description + "\n" + ExpectedOutputPrompt(this.expectedOutput);
    if (!context) return taskPrompt;

    return TaskWithContextPrompt(taskPrompt, context);
  }
}
