import { TraceWithLogsDto } from "@montelo/browser-client";
import { Link, useParams, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Routes } from "~/routes";
import { LogAnalytics } from "~/components/traces/LogAnalytics/LogAnalytics";
import { LogView } from "~/components/traces/LogView";
import { LogsTreeView } from "~/components/traces/LogsTreeView";
import { useUpdateQueryWithoutNavigation } from "~/hooks/useUpdateQueryWithoutNavigation";

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
                Traces & Logs
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{trace.name}</BreadcrumbItem>
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
