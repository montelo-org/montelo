import { ChatMessage } from "../Model";
import { generateId, injectParameters } from "../utils";
import type { AgentConstructor, AgentExecuteTaskParams, AgentInterface } from "./Agent.interface";
import { AgentSystemPrompt, TaskPrompt } from "./Agent.prompts";

export class Agent implements AgentInterface {
  public id: AgentInterface["id"];
  public name: AgentInterface["name"];
  public role: AgentInterface["role"];
  public systemMessage: AgentInterface["systemMessage"];
  public model: AgentInterface["model"];
  public tools?: AgentInterface["tools"];

  constructor({ name, role, systemMessage, tools, model }: AgentConstructor) {
    this.id = generateId("agent");
    this.name = name;
    this.role = role;
    this.systemMessage = systemMessage;
    this.model = model;
    this.tools = tools;
  }

  public injectInputsIntoPrompt(promptInputs: Record<string, any>): void {
    this.role = injectParameters(this.role, promptInputs);
    if (this.systemMessage) {
      this.systemMessage = injectParameters(this.systemMessage, promptInputs);
    }
  }

  public async executeTask({ task, context, trace }: AgentExecuteTaskParams): Promise<string> {
    const systemPrompt = AgentSystemPrompt(this.name, this.role, this.systemMessage);
    const taskPrompt = task.getPrompt(context);
    const userPrompt = TaskPrompt(taskPrompt);
    // tools = tools || this.tools;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ] as ChatMessage[];

    const completion = await trace.openai.chat.completions.create({
      name: `${task.getName()} / ${this.name}`,
      messages,
      model: this.model.modelName,
    });
    const response = completion.choices[0].message.content || "";

    return response;
  }
}
