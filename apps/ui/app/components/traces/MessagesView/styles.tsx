import { FC, ReactNode } from "react";

export const Title: FC<{ children: ReactNode }> = ({ children }) => {
  return <h1 className={"text-xl flex flex-row gap-2 items-center"}>{children}</h1>;
};

export const Content: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={"bg-secondary dark:bg-secondary/25 whitespace-pre-wrap rounded-xl px-8 py-4 text-sm"}>
      {children}
    </div>
  );
};

export const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={"whitespace-pre-wrap text-wrap text-sm"}>{children}</div>;
};

export const MessageContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={"flex flex-col gap-4"}>{children}</div>;
}