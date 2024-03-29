import { Trace } from "@montelo/core";
import type { Agent } from "../Agent";
import type { Tool } from "../Tool";

export interface TaskInterface {
  /** Autogenerated */
  id: string;
  /** The task's name */
  name: string;
  /** A clear, concise statement of what the task entails */
  description: string;
  /** Clear and detailed definition of expected output for the task. */
  expectedOutput: string;
  /** specify which agent is responsible for the task. If not, the crew's process will determine who takes it on */
  agent: Agent;
  /** functions or capabilities the agent can utilize to perform the task */
  tools?: Tool[];
  /** A function that is called after the task is complete */
  callback?: (output: string) => Promise<void>;
  /** If true, the task can be delegated to other agents */
  allowDelegation?: boolean;
}

export interface TaskConstructor extends Omit<TaskInterface, "id"> {}

export interface TaskExecuteParams {
  trace: Trace;
  agent?: Agent;
  context?: any;
  tools?: Tool[];
}
