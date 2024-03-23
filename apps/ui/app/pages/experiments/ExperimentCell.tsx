import { ExperimentDto } from "@montelo/browser-client";
import { useNavigate, useParams } from "@remix-run/react";
import dayjs from "dayjs";
import { FC } from "react";
import { Badge } from "~/components/ui/badge";
import { TableCell, TableRow } from "~/components/ui/table";
import { idShortener } from "~/pages/traces/utils";
import { Routes } from "~/routes";


export const ExperimentCell: FC<{ experiment: ExperimentDto }> = ({ experiment }) => {
  const navigate = useNavigate();
  const params = useParams();

  const { short, variant } = idShortener(experiment.id);

  const onCellClick = (experiment: ExperimentDto) => {
    navigate(
      Routes.app.project.env.experimentsId({
        projectId: params.projectId!,
        envId: params.envId!,
        experimentId: experiment.id,
      }),
    );
  };

  return (
    <TableRow
      key={experiment.id}
      onClick={() => {
        onCellClick(experiment);
      }}
    >
      <TableCell><Badge variant={variant}>{short}</Badge></TableCell>
      <TableCell>{experiment.name}</TableCell>
      <TableCell>{experiment.description}</TableCell>
      <TableCell>{dayjs(experiment.createdAt).format("MMM D YY / h:mm:ss a")}</TableCell>
    </TableRow>
  );
};
