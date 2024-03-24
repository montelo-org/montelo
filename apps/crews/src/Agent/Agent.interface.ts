import { Trace } from "montelo";
import type { Model } from "../Model";
import { Task } from "../Task";
import { Tool } from "../Tool";

export type AgentCallback = (output: string, agentName?: string) => Promise<void> | void;

export interface AgentInterface {
  /** Autogenerated */
  id: string;
  /** The agent's name */
  name: string;
  /** desctiption that determines the tasks its best suited for within the crew */
  role: string;
  /** Defines the goal this agent aims to achieve. This will guide its decision-making process */
  systemMessage?: string;
  /** The language model used by the agent to process and generate text (default: GPT-4) */
  model: Model;
  /** Functions that the agent can use to perform tasks */
  tools?: Tool[];
  /** A function that is called after each step of the agent */
  callback?: AgentCallback;
}

export interface AgentConstructor extends Omit<AgentInterface, "id"> {}

export type AgentExecuteTaskParams = {
  task: Task;
  context: any;
  trace: Trace;
  tools?: Tool[];
};
