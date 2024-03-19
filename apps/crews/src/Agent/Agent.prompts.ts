export const AgentSystemPrompt = (name: string, role: string, systemPrompt?: string) =>
  `You are: ${name}
Your role is: ${role}
${systemPrompt ? `\n${systemPrompt}\n` : ""}
Be brief and concise!`;

export const TaskPrompt = (task: string) =>
  `Your Task is:
${task}

Begin! This is VERY important to you, use any tools available and give your best final answer!
  `;

// export const ToolsPrompt = (tools: string, toolNames: string[]) =>
//   `\n\nYou ONLY have access to the following tools, and should NEVER make up tools that are not listed here:

//   ${tools}

//   Use the following format:

//   Thought: you should always think about what to do
//   Action: the action to take, only one name of [${toolNames.join(
//     ", "
//   )}], just the name, exactly as it's written.
//   Action Input: the input to the action, just a simple a python dictionary using " to wrap keys and values.\nObservation: the result of the action\n\nOnce all necessary information is gathered:\n\nThought: I now know the final answer\nFinal Answer: the final answer to the original input question\n`;

// export const NoToolsPrompt = () =>
//   `To give my best complete final answer to the task use the exact following format:

//   Thought: I now can give a great answer
//   Final Answer: my best complete final answer to the task.
//   Your final answer must be the great and the most complete as possible, it must be outcome described.

//   I MUST use these formats, my job depends on it!

//   Thought: `;
