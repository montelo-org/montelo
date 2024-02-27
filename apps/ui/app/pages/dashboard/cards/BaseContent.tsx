import { Skeleton } from "../../../components/ui/skeleton";

type BaseCardProps = {
  title?: string;
  content?: string;
  percent?: string;
}
export const BaseContent = ({ title, content, percent }: BaseCardProps) => (
  <div className={"flex flex-col"}>
    <div className={"flex flex-row gap-4"}>
      <h1 className={"text-2xl font-bold"}>
        {title}
      </h1>
      <p className={"text-base text-muted-foreground self-end"}>{percent ? `${percent}%` : ""}</p>
    </div>
    <p className={"text-base text-muted-foreground"}>
      {content}
    </p>
  </div>
);

export const BaseContentSkeleton = () =>
  <div className={"flex flex-col gap-2"}>
    <Skeleton className="h-7 w-3/4 rounded" />
    <Skeleton className="h-5 w-1/4 rounded" />
  </div>
;