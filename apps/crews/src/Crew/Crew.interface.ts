import type { Agent } from "../Agent";
import type { Model } from "../Model";
import type { Task } from "../Task";
import { Tool } from "../Tool";

export type Process = "managed" | "sequential";

type OptionalAgents<P> = P extends "sequential" ? { agents?: never } : { agents: Agent[] };

export type CrewConstructor<P extends Process> = OptionalAgents<P> & {
  /** A list of tasks assigned to the crew. */
  tasks: Task[];
  /** A list of tools that the crew has access to. */
  tools?: Tool[];
  /** A function that is called after each step of every agent. */
  stepCallback?: (output: any) => void;
  /** default model provider for the crew */
  defaultModelProvider?: Model;
  /** The process that the crew follows. "Sequential" or "Managed" */
  process: P;
};
