import { LogsTreeView } from "../../components/traces/LogsTreeView";
import { TraceWithLogsDto } from "@montelo/browser-client";
import { useState } from "react";
import { useUpdateQueryWithoutNavigation } from "../../hooks/useUpdateQueryWithoutNavigation";
import { useSearchParams } from "@remix-run/react";
import { LogView } from "../../components/traces/LogView";
import { LogAnalytics } from "../../components/traces/LogAnalytics/LogAnalytics";

type TraceIdProps = {
  trace: TraceWithLogsDto;
}

export const TraceIdPage = ({ trace }: TraceIdProps) => {
  const queryKey = "logId";
  const [searchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState<string>(searchParams.get(queryKey) ?? "");
  useUpdateQueryWithoutNavigation(queryKey, selectedId);

  const selectedLog = trace.logs.find(log => log.id === selectedId) ?? null;

  const handleSelect = (id: string) => {
    setSelectedId(selectedId === id ? "" : id);
  };

  return (
    <div>
      <h1 className={"text-2xl mb-4"}>{trace.name}</h1>
      <div className={"flex flex-row gap-8"}>
        <LogAnalytics trace={trace} />
      </div>

      <div className={"grid grid-cols-7 gap-4 mt-8"}>
        <div className="col-span-2">
          <LogsTreeView logs={trace.logs} selectedId={selectedId} handleSelect={handleSelect} />
        </div>
        <div className="col-span-5">
          {selectedLog && <LogView log={selectedLog} />}
        </div>
      </div>
    </div>
  );
};
