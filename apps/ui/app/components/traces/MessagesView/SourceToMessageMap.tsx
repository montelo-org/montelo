import Anthropic from "@anthropic-ai/sdk";
import { ChatCompletionResponse } from "@mistralai/mistralai";
import { LogDtoSourceEnum } from "@montelo/browser-client";
import OpenAI from "openai";
import { FC } from "react";
import { CodeBlock } from "~/components/traces/MessagesView/CodeBlock";
import { RoleHeaderMap } from "~/components/traces/MessagesView/RoleHeaderMap";
import { Content, Message, MessagesContainer, Title } from "~/components/traces/MessagesView/styles";

type SourceToMessageMapType = {
  [key in LogDtoSourceEnum]: {
    InputComponent: FC<{ value: any; jsonView: boolean }>;
    OutputComponent: FC<{ value: any; jsonView: boolean }>;
  };
};

export const SourceToMessageMap: SourceToMessageMapType = {
  [LogDtoSourceEnum.Manual]: {
    InputComponent: ({ value }) => (
      <Message>
        <Title>Input</Title>
        <CodeBlock value={JSON.stringify(value || {}, undefined, 2)} />
      </Message>
    ),
    OutputComponent: ({ value }) => (
      <Message>
        <Title>Output</Title>
        <CodeBlock value={JSON.stringify(value || {}, undefined, 2)} />
      </Message>
    ),
  },
  [LogDtoSourceEnum.Openai]: {
    InputComponent: ({ value, jsonView }) => {
      const typedValue = value as OpenAI.ChatCompletionCreateParams;

      return (
        <MessagesContainer>
          {typedValue.messages.map((value, index) => {
            const RoleHeader = RoleHeaderMap[value.role];
            // @ts-expect-error
            const toolName = value.role === "tool" ? value.name : null;

            const CodeView = <CodeBlock value={JSON.stringify(value, undefined, 2)} />;
            const PrettyContent = typeof value.content === "string" ? <Content>{value.content}</Content> : CodeView;

            return (
              <Message key={index}>
                <RoleHeader toolName={toolName} />
                {jsonView ? CodeView : PrettyContent}
              </Message>
            );
          })}
        </MessagesContainer>
      );
    },
    OutputComponent: ({ value, jsonView }) => {
      const typedValue = value as OpenAI.ChatCompletion;
      const message = typedValue.choices[0].message;
      const RoleHeader = RoleHeaderMap[message.role];
      const isToolCall = !message.content && !!message.tool_calls?.length;
      const ContentRender = isToolCall ? (
        <CodeBlock value={JSON.stringify(message.tool_calls, undefined, 2)}></CodeBlock>
      ) : (
        <Content>{message.content}</Content>
      );

      return (
        <Message>
          <RoleHeader />
          {jsonView ? <CodeBlock value={JSON.stringify(value, undefined, 2)} /> : ContentRender}
        </Message>
      );
    },
  },
  [LogDtoSourceEnum.Mistral]: {
    InputComponent: ({ value, jsonView }) => (
      <MessagesContainer>
        {value.messages.map(({ role, content }: { role: string; content: string | string[] }, index: number) => {
          const RoleHeader = RoleHeaderMap[role];
          const strContent =
            typeof content === "string" ? content : content.reduce((acc, content) => acc + content, "");
          return (
            <Message key={index}>
              {<RoleHeader />}
              {jsonView ? <CodeBlock value={JSON.stringify(value, undefined, 2)} /> : <Content>{strContent}</Content>}
            </Message>
          );
        })}
      </MessagesContainer>
    ),
    OutputComponent: ({ value, jsonView }) => {
      const typedValue = value as ChatCompletionResponse;
      const message = typedValue.choices[0].message;
      const RoleHeader = RoleHeaderMap[message.role];
      const content = message.content;

      return (
        <Message>
          <RoleHeader />
          {jsonView ? <CodeBlock value={JSON.stringify(value, undefined, 2)} /> : <Content>{content}</Content>}
        </Message>
      );
    },
  },
  [LogDtoSourceEnum.Anthropic]: {
    InputComponent: ({ value, jsonView }) => {
      const typedValue = value as Anthropic.MessageCreateParams;

      return (
        <MessagesContainer>
          {typedValue.messages.map((value, index) => {
            const RoleHeader = RoleHeaderMap[value.role];

            const CodeView = <CodeBlock value={JSON.stringify(value, undefined, 2)} />;
            const PrettyContent = typeof value.content === "string" ? <Content>{value.content}</Content> : CodeView;

            return (
              <Message key={index}>
                <RoleHeader />
                {jsonView ? CodeView : PrettyContent}
              </Message>
            );
          })}
        </MessagesContainer>
      );
    },
    OutputComponent: ({ value, jsonView }) => {
      const typedValue = value as Anthropic.Message;
      const RoleHeader = RoleHeaderMap[typedValue.role];
      const stringOutput = typedValue.content.reduce((acc, content) => acc + content.text, "");

      return (
        <Message>
          <RoleHeader />
          {jsonView ? <CodeBlock value={JSON.stringify(value, undefined, 2)} /> : <Content>{stringOutput}</Content>}
        </Message>
      );
    },
  },
  [LogDtoSourceEnum.Cohere]: {
    InputComponent: () => <p>Unimplemented</p>,
    OutputComponent: () => <p>Unimplemented</p>,
  },
};
