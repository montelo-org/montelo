import { LucideIcon } from "lucide-react";
import { ComponentProps, FC, ReactNode } from "react";

type ChildrenProps = {
  children: ReactNode;
};

type ChildrenPropsWithClassName = {
  className?: ComponentProps<"div">["className"];
  children: ReactNode;
};

export const AnalyticsContainer: FC<ChildrenPropsWithClassName> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`flex bg-secondary dark:bg-secondary/25 w-full divide-x rounded-xl border ${className || ""}`}
    >
      {children}
    </div>
  );
};

export const SingleContainer: FC<ChildrenPropsWithClassName> = ({ className, children }) => {
  return <div className={`flex flex-1 justify-between gap-4 p-4 ${className || ""}`}>{children}</div>;
};

export const StatsContainer: FC<ChildrenProps> = ({ children }) => {
  return <div className={"flex flex-col"}>{children}</div>;
};

export const AnalyticsTitle: FC<ChildrenPropsWithClassName> = ({ className, children }) => {
  return <p className={`text text-muted-foreground ${className}`}>{children}</p>;
};

export const AnalyticsMajorStat: FC<ChildrenProps> = ({ children }) => {
  return <p className={"my-1 text-2xl font-medium"}>{children}</p>;
};

export const AnalyticsMinorStat: FC<ChildrenProps> = ({ children }) => {
  return <p className={"text-muted-foreground text-sm"}>{children}</p>;
};

type IconWrapperProps = {
  Icon: LucideIcon;
};
export const IconWrapper: FC<IconWrapperProps> = ({ Icon }) => {
  return <Icon className={"self-center"} />;
};
