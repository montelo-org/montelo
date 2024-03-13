import { Bot, Hammer, Settings2, User } from "lucide-react";
import { FC } from "react";
import { Title } from "./styles";

export const RoleHeaderMap: Record<string, FC> = {
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
  tool: () => (
    <Title>
      <Hammer size={20} />
      Tool
    </Title>
  ),
  function: () => (
    <Title>
      <Hammer size={20} />
      Function
    </Title>
  ),
};
