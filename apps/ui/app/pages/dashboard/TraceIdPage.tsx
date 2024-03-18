import { TraceWithLogsDto } from "@montelo/browser-client";
import { Link, useParams, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { LogAnalytics } from "~/components/traces/LogAnalytics/LogAnalytics";
import { LogView } from "~/components/traces/LogView";
import { LogsTreeView } from "~/components/traces/LogsTreeView";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { useKey, useMount } from "~/hooks";
import { useUpdateQueryWithoutNavigation } from "~/hooks/useUpdateQueryWithoutNavigation";
import { Routes } from "~/routes";

type TraceIdProps = {
  trace: TraceWithLogsDto;
};

export const TraceIdPage = ({ trace }: TraceIdProps) => {
  const queryKey = "logId";
  const params = useParams();
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
    <div>
      <Breadcrumb className={"mb-4 pt-2"}>
        <BreadcrumbList className={"text-xl"}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to={Routes.app.project.env.traces({
                  projectId: params.projectId!,
                  envId: trace.envId,
                })}
              >
                Traces
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{trace.name || "—"}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
