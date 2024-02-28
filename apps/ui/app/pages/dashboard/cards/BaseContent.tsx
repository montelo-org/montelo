import { Skeleton } from "../../../components/ui/skeleton";
import { FC } from "react";

type BaseCardProps = {
  title?: string;
  content?: FC;
  percent?: string;
}
export const BaseContent = ({ title, content: Content, percent }: BaseCardProps) => (
  <div className={"flex flex-col"}>
    <div className={"flex flex-row gap-2"}>
      <h1 className={"text-2xl font-bold"}>
        {title}
      </h1>
      <p className={"text-base text-muted-foreground self-end"}>{percent ? `${percent}` : ""}</p>
    </div>
    <div className={"mt-1"}>
      {Content && <Content />}
    </div>
  </div>
);

export const BaseContentSkeleton = () =>
  <div className={"flex flex-col gap-2"}>
    <Skeleton className="h-7 w-3/4 rounded" />
    <Skeleton className="h-5 w-1/4 rounded" />
  </div>
;