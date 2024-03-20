import { Bot, Hammer, Settings2, User } from "lucide-react";
import { FC } from "react";
import { Title } from "./styles";

type Props = {
  toolName?: string;
};
export const RoleHeaderMap: Record<string, FC<Props>> = {
  system: () => (
    <Title>
      <Settings2 size={20} />
      System
    </Title>
  ),
  user: () => (
    <Title>
      <User size={20} />
      User
    </Title>
  ),
  assistant: () => (
    <Title>
      <Bot size={20} />
      Assistant
    </Title>
  ),
  tool: ({ toolName }) => (
    <Title>
      <Hammer size={20} />
      Tool<span className="text-muted-foreground text-base">({toolName})</span>
    </Title>
  ),
  function: () => (
    <Title>
      <Hammer size={20} />
      Function
    </Title>
  ),
};
