import type { Agent } from "../Agent";
import type { AbstractModelProvider } from "../ModelProvider/ModelProvider";
import type { Task } from "../Task";

export type Process = "managed" | "sequential";

type OptionalAgents<P> = P extends "sequential"
  ? { agents?: never }
  : { agents: Agent[] };

export type CrewConstructor<P extends Process> = OptionalAgents<P> & {
  /** A list of tasks assigned to the crew. */
  tasks: Task[];
  /** A function that is called after each step of every agent. */
  stepCallback?: (output: any) => void;
  /** default model provider for the crew */
  defaultModelProvider?: AbstractModelProvider;
  process: P;
};
