import { DatapointRunDto } from "@montelo/browser-client";
import { useNavigate, useParams } from "@remix-run/react";
import dayjs from "dayjs";
import { FC } from "react";
import { Badge } from "~/components/ui/badge";
import { TableCell, TableRow } from "~/components/ui/table";
import { idShortener } from "~/pages/traces/utils";
import { Routes } from "~/routes";

export const DatapointRunCell: FC<{ datapointRun: DatapointRunDto }> = ({ datapointRun }) => {
  const navigate = useNavigate();
  const params = useParams();

  const { short, variant } = idShortener(datapointRun.id);

  const onCellClick = (datapointRun: DatapointRunDto) => {
    navigate(
      Routes.app.project.env.datapointRunId({
        projectId: params.projectId!,
        envId: params.envId!,
        experimentId: params.experimentId!,
        datapointRunId: datapointRun.id,
      }),
    );
  };

  return (
    <TableRow
      key={datapointRun.id}
      onClick={() => {
        onCellClick(datapointRun);
      }}
    >
      <TableCell className={"w-1/12"}>
        <Badge variant={variant}>{short}</Badge>
      </TableCell>
      <TableCell className={"w-1/6"}>{dayjs(datapointRun.createdAt).format("MMM D YY / h:mm:ss a")}</TableCell>
      <TableCell>{JSON.stringify(datapointRun.output)}</TableCell>
    </TableRow>
  );
};
