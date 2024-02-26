import { ComponentProps, FC, ReactNode } from "react";
import { LucideIcon } from "lucide-react";

type ChildrenProps = {
  children: ReactNode;
}

type ChildrenPropsWithClassName = {
  className?: ComponentProps<"div">["className"];
  children: ReactNode;
}

export const AnalyticsContainer: FC<ChildrenPropsWithClassName & { numCols: number }> = ({ className, numCols, children }) => {
  return <div className={`grid grid-cols-${numCols} w-full divide-x bg-secondary dark:bg-secondary/25 rounded-xl border ${className || ""}`}>{children}</div>;
};

export const SingleContainer: FC<ChildrenPropsWithClassName> = ({ className, children }) => {
  return <div className={`flex gap-4 p-4 justify-between ${className || ""}`}>{children}</div>;
};

export const StatsContainer: FC<ChildrenProps> = ({ children }) => {
  return <div className={"flex flex-col"}>{children}</div>;
};

export const AnalyticsTitle: FC<ChildrenPropsWithClassName> = ({ className, children }) => {
  return <p className={`text text-muted-foreground ${className}`}>{children}</p>;
};

export const AnalyticsMajorStat: FC<ChildrenProps> = ({ children }) => {
  return <p className={"font-medium text-2xl my-1"}>{children}</p>;
};

export const AnalyticsMinorStat: FC<ChildrenProps> = ({ children }) => {
  return <p className={"text-sm text-muted-foreground"}>{children}</p>;
};

type IconWrapperProps = {
  Icon: LucideIcon;
}
export const IconWrapper: FC<IconWrapperProps> = ({ Icon }) => {
  return <Icon className={"self-center"} />;
};
