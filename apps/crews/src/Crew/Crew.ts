import { Agent } from "../Agent";
import { ManagerRole, ManagerSystemPrompt } from "../Agent/Agent.prompts";
import type { Model } from "../Model";
import { Task } from "../Task";
import { Tool } from "../Tool";
import type { ChatMessage } from "../types";
import type { CrewConstructor, Process, RunParams, RunResponse, StartParams } from "./Crew.interface";
import {
  AskQuestionDescription,
  AskQuestionInput,
  DelegateWorkDescription,
  DelegateWorkInput,
  TAskQuestionInput,
  TDelegateWorkInput,
} from "./Crew.tools";

export class Crew<P extends Process> {
  private readonly globalChatHistory: ChatMessage[] = [];
  private readonly name: string = "Crew";
  private readonly process: Process = "sequential";
  private readonly agents?: Agent[] = [];
  private readonly tasks: Task[] = [];
  private readonly tools?: Tool[] = [];
  private readonly managerModel?: Model;
  private trace: any;
  private currentTaskName: string = "";
  private readonly stepCallback?: (output: any) => void;

  constructor({ name, agents, tasks, tools, stepCallback, managerModel, process }: CrewConstructor<P>) {
    if (process === "managed" && (!agents?.length || !managerModel)) {
      throw new Error("Invalid parameters! For a managed process, agents and a managerModel need to be defined!");
    }
    if (!tasks?.length) throw new Error("Invalid parameters! Tasks need to be defined!");

    this.name = name || this.name;
    this.agents = agents || (tasks.map((task) => task.agent).filter((agent) => agent !== undefined) as Agent[]);
    this.tasks = tasks;
    this.tools = tools;
    this.process = process;
    this.stepCallback = stepCallback;
    this.managerModel = managerModel;
  }

  public async start({ promptInputs, monteloClient }: StartParams): Promise<RunResponse> {
    this.trace = monteloClient.trace({ name: this.name });

    if (promptInputs && Object.keys(promptInputs).length > 0) {
      this.injectInputsIntoPrompt(promptInputs);
    }

    if (this.process === "sequential") {
      return await this.runSequential({ promptInputs });
    } else {
      return await this.runManaged({ promptInputs });
    }

    // const USER_AGENT = this.agents.find((agent) => agent.type === "user");
    // if (USER_AGENT === null || USER_AGENT === undefined) throw new Error("No UserAgent defined!");
    // this._addMessageToHistory({ agentName: USER_AGENT.name, message: task });

    // let numManagerRounds = 0;
    // while (numManagerRounds < this.maxRounds) {
    //   const startingAgentCompletion = await startingAgent.modelProvider.chatCompletion({
    //     messages: [
    //       {
    //         role: "system",
    //         content: startingAgent.instructions,
    //       },
    //       {
    //         role: "user",
    //         content: this._getManagerPrompt(
    //           this.agents.filter((a) => a.name !== startingAgent.name),
    //           this.globalChatHistory,
    //         ),
    //       },
    //     ],
    //   });
    //   const agentNameToCall = startingAgentCompletion.content?.replace(/@/g, "");
    //   if (!agentNameToCall || !this.agents.find((agent) => agent.name === agentNameToCall)) {
    //     throw new Error("Invalid agent name: " + agentNameToCall);
    //   }

    //   console.log("messages: ", messages);
    //   console.log("startingAgentCompletion: ", startingAgentCompletion);

    //   // Find and interact with the selected agent
    //   // Handle tool calls and their responses
    //   // Generate summary and update chat history
    //   numManagerRounds++;
    // }

    // Return final result after exiting the loop
  }

  private async runSequential({ promptInputs }: RunParams): Promise<RunResponse> {
    let context = "";
    const taskOutputs = [] as any[];

    for (const task of this.tasks) {
      this.currentTaskName = task.getName();
      this.trace.log({ name: task.getName(), input: { ...promptInputs, context } });
      const output = await task.execute({ context, trace: this.trace, tools: this.tools });

      context = output;
      taskOutputs.push(output);
    }

    return { taskOutputs };
  }

  private async runManaged({ promptInputs }: RunParams): Promise<RunResponse> {
    const coworkers = (this.agents || [])
      .map((agent) => `${agent.name.toLowerCase().trim()}: ${agent.role}`)
      .join("\n");

    const manager = new Agent({
      name: "Manager",
      role: ManagerRole,
      systemMessage: ManagerSystemPrompt(coworkers),
      model: this.managerModel!,
      tools: this.getCollaborationTools(),
    });

    let context = "";
    const taskOutputs = [] as any[];

    for (const task of this.tasks) {
      this.currentTaskName = task.getName();
      this.trace.log({ name: task.getName(), input: { ...promptInputs, context } });
      const output = await task.execute({ agent: manager, context, trace: this.trace, tools: manager.tools });

      context = output;
      taskOutputs.push(output);
    }

    return { taskOutputs };
  }

  private injectInputsIntoPrompt(promptInputs: Record<string, any>): void {
    this.agents?.forEach((agent) => agent.injectInputsIntoPrompt(promptInputs));
    this.tasks.forEach((task) => task.injectInputsIntoPrompt(promptInputs));
  }

  private getCollaborationTools(): Tool[] {
    const coworkers = (this.agents || []).map((agent) => agent.name.toLowerCase().trim()).join(", ");

    const delegateWorkTool = new Tool({
      name: "DelegateWork",
      function: this.delegateWork.bind(this),
      description: DelegateWorkDescription(coworkers),
      schema: DelegateWorkInput,
    });

    const askQuestionTool = new Tool({
      name: "AskQuestion",
      function: this.askQuestion.bind(this),
      description: AskQuestionDescription(coworkers),
      schema: AskQuestionInput,
    });

    return [delegateWorkTool, askQuestionTool];
  }

  private async delegateWork({ context, coworker, task }: TDelegateWorkInput): Promise<string> {
    return this.executeTask.bind(this)(coworker, task, context);
  }

  private async askQuestion({ context, question, coworker }: TAskQuestionInput): Promise<string> {
    return this.executeTask.bind(this)(coworker, question, context);
  }

  private async executeTask(coworker: string, task: string, context: string): Promise<string> {
    const agent = this.agents?.find((agent) => agent.name.toLowerCase().trim() === coworker.toLowerCase().trim());
    if (!agent) {
      throw new Error(`Agent with name ${coworker} not found.`);
    }

    const taskObj = new Task({
      name: `${this.currentTaskName} / Delegate Task`,
      description: task,
      agent,
      expectedOutput: "Your best answer to your coworker asking you this, accounting for the context shared.",
    });
    await this.trace.log({ name: taskObj.getName(), input: { coworker, task, context } });

    return agent.executeTask({ task: taskObj, context, trace: this.trace });
  }

  // private _getManagerPrompt(agents: AgentInterface[], chatHistory: ChatMessage[]): string {
  //   const availableRoles = agents.map((agent) => `@${agent.name}: ${agent.instructions}`).join("\n");
  //   const formattedChatHistory = chatHistory.map((c) => `@${c.agentName}: ${c.message}`).join("\n---\n");

  //   return `
  //     You are in a role play game. The following roles are available:
  //     ${availableRoles}

  //     Read the following conversation.

  //     CHAT HISTORY
  //     ${formattedChatHistory}

  //     Then select the role that is going to speak next. Only return the role.
  //     `;
  // }

  // private _addMessageToHistory(chatMessage: ChatMessage): void {
  //   this.globalChatHistory.push(chatMessage);
  // }
}
