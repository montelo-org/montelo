import { DatapointRunDto } from "@montelo/browser-client";
import { FC } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { DatapointRunCell } from "~/pages/experiments/ExperimentId/DatapointRunCell";

export const DatapointRunsTable: FC<{ datapointRuns: DatapointRunDto[] }> = ({ datapointRuns }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Output</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datapointRuns.map((datapointRun) => (
          <DatapointRunCell key={datapointRun.id} datapointRun={datapointRun} />
        ))}
      </TableBody>
    </Table>
  );
};
