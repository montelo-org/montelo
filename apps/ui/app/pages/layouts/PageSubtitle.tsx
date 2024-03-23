import { FC, ReactNode } from "react";

export const PageSubtitle: FC<{ children: ReactNode }> = ({ children }) => {
  return <p className={"text-muted-foreground"}>{children}</p>;
};
