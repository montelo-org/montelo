import { FullDatapointRunDto } from "@montelo/browser-client";
import { useNavigate, useParams } from "@remix-run/react";
import dayjs from "dayjs";
import { FC } from "react";
import { PrettyJson } from "~/components/PrettyJson";
import { Badge } from "~/components/ui/badge";
import { TableCell, TableRow } from "~/components/ui/table";
import { idShortener } from "~/pages/traces/utils";
import { Routes } from "~/routes";

export const DatapointRunCell: FC<{ datapointRun: FullDatapointRunDto }> = ({ datapointRun }) => {
  const navigate = useNavigate();
  const params = useParams();

  const { short, variant } = idShortener(datapointRun.id);

  const onCellClick = (datapointRun: FullDatapointRunDto) => {
    navigate(
      Routes.app.project.env.datapointRunId({
        projectId: params.projectId!,
        envId: params.envId!,
        experimentId: params.experimentId!,
        datapointRunId: datapointRun.id,
      }),
    );
  };

  const WrappedCell = ({ children }: { children: React.ReactNode }) => (
    <TableCell
      className={"w-2/8"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {children}
    </TableCell>
  );

  return (
    <TableRow key={datapointRun.id}>
      <TableCell
        className={"w-1/8 cursor-pointer"}
        onClick={() => {
          onCellClick(datapointRun);
        }}
      >
        <Badge variant={variant}>{short}</Badge>
      </TableCell>
      <TableCell className={"w-1/8"}>{datapointRun.createdAt}</TableCell>
      <WrappedCell>
        <PrettyJson data={datapointRun.datapoint.input} />
      </WrappedCell>
      <WrappedCell>
        <PrettyJson data={datapointRun.datapoint.expectedOutput} />
      </WrappedCell>
      <WrappedCell>
        <PrettyJson data={datapointRun.output} />
      </WrappedCell>
    </TableRow>
  );
};
