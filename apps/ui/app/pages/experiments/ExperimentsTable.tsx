import { ExperimentDto } from "@montelo/browser-client";
import { useNavigate, useParams } from "@remix-run/react";
import { FC } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Routes } from "~/routes";

export const ExperimentsTable: FC<{ experiments: ExperimentDto[] }> = ({ experiments }) => {
  const navigate = useNavigate();
  const params = useParams();

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Dataset ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {experiments.map((experiment) => (
          <TableRow
            key={experiment.id}
            onClick={() => {
              onCellClick(experiment);
            }}
          >
            <TableCell>{experiment.id}</TableCell>
            <TableCell>{experiment.name}</TableCell>
            <TableCell>{experiment.description}</TableCell>
            <TableCell>{experiment.datasetId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
