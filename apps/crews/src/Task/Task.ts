import { Tool } from "../Tool";
import { generateId, injectParameters } from "../utils";
import type { TaskConstructor, TaskExecuteParams, TaskInterface } from "./Task.interface";
import { ExpectedOutputPrompt, TaskWithContextPrompt } from "./Task.prompts";

export class Task implements TaskInterface {
  public readonly id: TaskInterface["id"];
  public readonly name: TaskInterface["name"];
  public readonly agent: TaskInterface["agent"];
  public description: TaskInterface["description"];
  public expectedOutput: TaskInterface["expectedOutput"];
  public tools: Tool[];
  // public callback?: TaskInterface["callback"];
  public allowDelegation: TaskInterface["allowDelegation"];

  constructor({ name, description, agent, expectedOutput, tools, allowDelegation }: TaskConstructor) {
    this.id = generateId("task");
    this.name = name;
    this.description = description;
    this.agent = agent;
    this.expectedOutput = expectedOutput;
    this.tools = tools || [];
    // this.callback = callback;
    this.allowDelegation = allowDelegation || false;
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
    const names = this.name.split("/").map((n) => n.trim());
    if (names.length === 1) return `Task: ${this.name}`;

    const childTaskName = names.pop();
    const parentTaskName = names.join(" / ");
    return `${parentTaskName} / Task: ${childTaskName}`;
  }

  public getPrompt(context?: any): string {
    const taskPrompt = this.description + "\n" + ExpectedOutputPrompt(this.expectedOutput);
    if (!context) return taskPrompt;

    return TaskWithContextPrompt(taskPrompt, context);
  }

  public addTools(tools: Tool[]): void {
    this.tools = this.tools.concat(tools);
  }
}
