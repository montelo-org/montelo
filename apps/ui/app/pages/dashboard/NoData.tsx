import { CircleSlash } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";


export const NoData = () => {
  return (
    <div className={"flex h-full items-center justify-center rounded-lg border"}>
      <Alert className={"flex w-fit flex-row items-center justify-start gap-4 p-4"}>
        <div>
          <CircleSlash size={20} />
        </div>
        <div className={"flex flex-col"}>
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>Try another date filter.</AlertDescription>
        </div>
      </Alert>
    </div>
  );
};
