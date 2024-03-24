import type { Agent } from "../Agent";
import type { Model } from "../Model";
import type { Task } from "../Task";
import { Tool } from "../Tool";

export type Process = "managed" | "sequential";

type OptionalManagerModel<P> = P extends "sequential"
  ? { managerModel?: never }
  : {
      /** the model provider for the manager */
      managerModel: Model;
    };

export type CrewConstructor<P extends Process> = OptionalManagerModel<P> & {
  /** name of the crew */
  name?: string;
  /** list of theagents in the crew */
  agents: Agent[];
  /** The process that the crew follows. "Sequential" or "Managed" */
  process: P;
  /** A list of tasks assigned to the crew. */
  tasks: Task[];
  /** A list of tools that the crew has access to. */
  tools?: Tool[];
  /** A function that is called after each step of every agent. */
  stepCallback?: (output: any) => void;
};

export type StartParams = {
  /** The inputs for the crew's process. */
  promptInputs?: Record<string, any>;
  /** The montelo client. */
  monteloClient: any;
};

export type RunParams = {
  promptInputs?: Record<string, any>;
};

export type RunResponse = {
  /** The output of the crew's process. */
  // result: string;
  /** The chat history of the crew's process. */
  taskOutputs: string[];
};
