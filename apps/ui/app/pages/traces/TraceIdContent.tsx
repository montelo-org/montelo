import { TraceWithLogsDto } from "@montelo/browser-client";
import { useSearchParams } from "@remix-run/react";
import { FC, useState } from "react";
import { TraceAnalytics } from "~/components/traces/LogAnalytics/TraceAnalytics";
import { LogView } from "~/components/traces/LogView";
import { LogsTreeView } from "~/components/traces/LogsTreeView";
import { useKey, useMount } from "~/hooks";
import { useUpdateQueryWithoutNavigation } from "~/hooks/useUpdateQueryWithoutNavigation";

export const TraceIdContent: FC<{ trace: TraceWithLogsDto }> = ({ trace }) => {
  const queryKey = "logId";
  const [searchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState<string>(searchParams.get(queryKey) ?? "");
  useUpdateQueryWithoutNavigation(queryKey, selectedId);

  const selectedLog = trace.logs.find((log) => log.id === selectedId) ?? null;

  const handleSelect = (id: string) => {
    setSelectedId(selectedId === id ? "" : id);
  };

  const setDefaultSelectedId = () => {
    if (!selectedId) {
      setSelectedId(trace.logs[0].id);
    }
  };
  useMount(setDefaultSelectedId);

  const handleArrowRight = () => {
    const nextLog = trace.logs[trace.logs.findIndex((log) => log.id === selectedId) + 1];
    if (!nextLog) {
      return;
    }
    setSelectedId(nextLog.id);
  };
  useKey("ArrowRight", handleArrowRight, { event: "keyup" }, [selectedId]);

  const handleArrowLeft = () => {
    const previousLog = trace.logs[trace.logs.findIndex((log) => log.id === selectedId) - 1];
    if (!previousLog) {
      return;
    }
    setSelectedId(previousLog.id);
  };
  useKey("ArrowLeft", handleArrowLeft, { event: "keyup" }, [selectedId]);

  return (
    <>
      <div className={"flex flex-col gap-1"}>
        <h1 className={"text-xl"}>Trace Analytics</h1>
        <TraceAnalytics trace={trace} />
      </div>

      <div className={"mt-2 grid grid-cols-7 gap-4"}>
        <div className="col-span-2">
          <LogsTreeView logs={trace.logs} selectedId={selectedId} handleSelect={handleSelect} />
        </div>
        <div className="col-span-5">{selectedLog && <LogView log={selectedLog} />}</div>
      </div>
    </>
  );
};
