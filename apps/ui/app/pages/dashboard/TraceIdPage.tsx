import { TraceWithLogsDto } from "@montelo/browser-client";
import { useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { LogAnalytics } from "../../components/traces/LogAnalytics/LogAnalytics";
import { LogView } from "../../components/traces/LogView";
import { LogsTreeView } from "../../components/traces/LogsTreeView";
import { useUpdateQueryWithoutNavigation } from "../../hooks/useUpdateQueryWithoutNavigation";

type TraceIdProps = {
  trace: TraceWithLogsDto;
};

export const TraceIdPage = ({ trace }: TraceIdProps) => {
  const queryKey = "logId";
  const [searchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState<string>(searchParams.get(queryKey) ?? "");
  useUpdateQueryWithoutNavigation(queryKey, selectedId);

  const selectedLog = trace.logs.find((log) => log.id === selectedId) ?? null;

  const handleSelect = (id: string) => {
    setSelectedId(selectedId === id ? "" : id);
  };

  return (
    <div>
      <h1 className={"mb-4 text-2xl"}>{trace.name}</h1>
      <div className={"flex flex-row gap-8"}>
        <LogAnalytics trace={trace} />
      </div>

      <div className={"mt-8 grid grid-cols-7 gap-4"}>
        <div className="col-span-2">
          <LogsTreeView logs={trace.logs} selectedId={selectedId} handleSelect={handleSelect} />
        </div>
        <div className="col-span-5">{selectedLog && <LogView log={selectedLog} />}</div>
      </div>
    </div>
  );
};
