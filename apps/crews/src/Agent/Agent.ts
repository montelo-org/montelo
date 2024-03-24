import { ChatCompletionMessageToolCall, ChatCompletionToolMessageParam } from "openai/resources";
import { ChatMessage } from "../Model";
import { Tool } from "../Tool";
import { generateId, injectParameters } from "../utils";
import type { AgentCallback, AgentConstructor, AgentExecuteTaskParams, AgentInterface } from "./Agent.interface";
import { AgentSystemPrompt, TaskPrompt } from "./Agent.prompts";

export class Agent implements AgentInterface {
  public readonly id: AgentInterface["id"];
  public readonly name: AgentInterface["name"];
  public readonly model: AgentInterface["model"];
  public role: AgentInterface["role"];
  public systemMessage: AgentInterface["systemMessage"];
  public tools: Tool[] = [];
  public callbacks: AgentCallback[] = [];

  constructor({ name, role, systemMessage, tools, model, callback }: AgentConstructor) {
    this.id = generateId("agent");
    this.name = name;
    this.role = role;
    this.systemMessage = systemMessage;
    this.model = model;
    this.tools = tools || [];
    if (callback) this.callbacks = [callback];
  }

  public injectInputsIntoPrompt(promptInputs: Record<string, any>): void {
    this.role = injectParameters(this.role, promptInputs);
    if (this.systemMessage) {
      this.systemMessage = injectParameters(this.systemMessage, promptInputs);
    }
  }

  public async executeTask({ task, context, trace, tools }: AgentExecuteTaskParams): Promise<string> {
    tools = this.combineTools(tools);
    const formattedTools = tools.map((tool) => tool.toJSON());
    const availableTools = tools.map((tool) => tool.name).join("\n");

    const systemPrompt = AgentSystemPrompt(this.name, this.role, this.systemMessage);
    const taskPrompt = task.getPrompt(context);
    const userPrompt = TaskPrompt(taskPrompt, availableTools);

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];
    const completion = await trace.openai.chat.completions.create({
      name: `${task.getName()} / ${this.name}`,
      messages,
      model: this.model.modelName,
      tools: formattedTools.length ? formattedTools : undefined,
    });

    const response = completion.choices[0].message || "";
    const toolCalls = response.tool_calls;

    // If no tool calls, return the response
    if (!toolCalls || response.content) {
      return response.content || "No response found.";
    }

    // If there are tool calls, handle them
    const toolCallResponses = await this.handleToolCalls(toolCalls, tools);

    const resultCompletion = await trace.openai.chat.completions.create({
      name: `${task.getName()} / ${this.name} Response`,
      messages: [
        ...messages,
        response,
        ...toolCallResponses,
        {
          role: "user",
          content:
            "Given the results from the tools, the task given to you, and the expected format, what is the final answer for this task?",
        },
      ],
      model: this.model.modelName,
    });
    const result = resultCompletion.choices[0].message.content || "";

    this.callbacks.forEach(async (callback) => await callback(result, this.name));

    return result;
  }

  private combineTools(tools: Tool[] = []): Tool[] {
    const toolsMap = new Map<string, Tool>();
    for (const tool of [...this.tools, ...tools]) {
      toolsMap.set(tool.id, tool);
    }
    return Array.from(toolsMap.values());
  }

  private getToolByName(name: string, tools?: Tool[]): Tool {
    const tool = tools?.find((tool) => tool.name === name);
    if (!tool) throw new Error(`Tool "${name}" not found.`);
    return tool;
  }

  private async handleToolCalls(toolCalls: ChatCompletionMessageToolCall[], tools?: Tool[]) {
    const toolCallPromises = toolCalls.map(async (toolCall) => {
      const toolName = toolCall.function.name;
      const tool = this.getToolByName(toolName, tools);

      const handler = tool.function;
      const handlerArgs = JSON.parse(toolCall.function.arguments) as Record<string, any>;

      try {
        const functionResponse = await handler(handlerArgs);
        return {
          tool_call_id: toolCall.id,
          role: "tool",
          content: functionResponse,
          name: toolName,
        } as ChatCompletionToolMessageParam;
      } catch (e) {
        console.log("Error in tool", toolName, e);
        return {
          tool_call_id: toolCall.id,
          role: "tool",
          content: "Error",
          name: toolName,
        } as ChatCompletionToolMessageParam;
      }
    });
    return await Promise.all(toolCallPromises);
  }
}
