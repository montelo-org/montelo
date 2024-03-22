import { FC, ReactNode } from "react";

export const Title: FC<{ children: ReactNode }> = ({ children }) => {
  return <h1 className={"flex flex-row items-center gap-2 text-xl"}>{children}</h1>;
};

export const Content: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={"bg-secondary whitespace-pre-wrap rounded-xl px-8 py-4"}>{children}</div>;
};

export const MessagesContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={"flex flex-col gap-4"}>{children}</div>;
};

export const Message: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={"flex flex-col gap-1"}>{children}</div>;
};
