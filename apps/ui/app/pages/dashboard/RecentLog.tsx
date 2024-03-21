import { LogDto } from "@montelo/browser-client";
import { Link, useParams } from "@remix-run/react";
import dayjs from "dayjs";
import { FC } from "react";
import { Badge } from "~/components/ui/badge";
import { TableCell, TableRow } from "~/components/ui/table";
import { idShortener } from "~/pages/traces/utils";
import { Routes } from "~/routes";

export const RecentLog: FC<{ log: LogDto }> = ({ log }) => {
  const params = useParams();
  const { short: shortTraceId, variant } = idShortener(log.traceId);
  const { short: shortLogId } = idShortener(log.id);

  return (
    <TableRow>
      <TableCell>{dayjs(log.startTime || log.createdAt).format("h:mm:ssa")}</TableCell>
      <TableCell>
        <Link
          to={Routes.app.project.env.traceId({
            projectId: params.projectId!,
            envId: params.envId!,
            traceId: log.traceId,
            logId: log.id,
          })}
        >
          <Badge variant={variant}>
            {shortTraceId} / {shortLogId}
          </Badge>
        </Link>
      </TableCell>
      <TableCell>{log.name || "—"}</TableCell>
      <TableCell>{log.duration ? `${log.duration}s` : "—"}</TableCell>
      <TableCell>{log.totalCost ? `$${log.totalCost}` : "—"}</TableCell>
    </TableRow>
  );
};
