import { Montelo } from "montelo";
import type { Agent } from "../Agent";
import type { Model } from "../Model";
import type { Task } from "../Task";
import type { ChatMessage } from "../types";
import type { CrewConstructor, Process } from "./Crew.interface";

export class Crew<P extends Process> {
  private readonly globalChatHistory: ChatMessage[] = [];
  private readonly agents?: Agent[] = [];
  private readonly tasks: Task[] = [];
  private readonly stepCallback?: (output: any) => void;
  private readonly defaultModelProvider?: Model;
  // private readonly tools: ToolInterface[] = [];

  constructor({ agents, tasks, stepCallback, defaultModelProvider, process }: CrewConstructor<P>) {
    if ((!agents?.length && process === "managed") || !tasks?.length)
      throw new Error("Invalid parameters! Agents and tasks need to be defined!");

    this.agents = agents || (tasks.map((task) => task.agent).filter((agent) => agent !== undefined) as Agent[]);
    this.tasks = tasks;
    this.stepCallback = stepCallback;
    this.defaultModelProvider = defaultModelProvider;
  }

  public async start({
    promptInputs,
    monteloClient,
  }: {
    promptInputs?: Record<string, any>;
    monteloClient: Montelo;
  }): Promise<string> {
    const trace = monteloClient.trace({ name: "Crew" });

    if (promptInputs && Object.keys(promptInputs).length > 0) {
      this._injectInputsIntoPrompt(promptInputs);
    }

    let context = "";
    const taskOutputs = [] as any[];

    for (const task of this.tasks) {
      trace.log({ name: task.getName(), input: promptInputs });
      const output = await task.execute({ context, trace });

      context = output;
      taskOutputs.push(output);
    }

    console.log("taskOutputs: ", taskOutputs);

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
    return "Started!";
  }

  private _injectInputsIntoPrompt(promptInputs: Record<string, any>): void {
    this.agents?.forEach((agent) => agent.injectInputsIntoPrompt(promptInputs));
    this.tasks.forEach((task) => task.injectInputsIntoPrompt(promptInputs));
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
