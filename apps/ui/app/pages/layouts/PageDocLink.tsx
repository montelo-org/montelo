import { Link } from "@remix-run/react";
import { FC, ReactNode } from "react";

export const PageDocLink: FC<{ to: string; children: ReactNode }> = ({ to, children }) => {
  return (
    <Link to={to} target={"_blank"}>
      <span
        className={"text-primary dark:text-primary-foreground decoration-primary font-bold underline decoration-2 underline-offset-2"}
      >
        {children}
      </span>
    </Link>
  );
};
