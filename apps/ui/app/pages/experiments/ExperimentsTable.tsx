import { ExperimentDto } from "@montelo/browser-client";
import { FC } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { ExperimentCell } from "~/pages/experiments/ExperimentCell";

export const ExperimentsTable: FC<{ experiments: ExperimentDto[] }> = ({ experiments }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created On</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {experiments.map((experiment) => (
          <ExperimentCell key={experiment.id} experiment={experiment} />
        ))}
      </TableBody>
    </Table>
  );
};
