import { DatapointRunDto } from "@montelo/browser-client";
import { FC } from "react";
import Pagination from "~/components/pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { DatapointRunCell } from "~/pages/experiments/ExperimentId/DatapointRunCell";

type DatapointRunsTableProps = {
  datapointRuns: DatapointRunDto[];
  currentPage: number;
  totalPages: number;
};

export const DatapointRunsTable: FC<DatapointRunsTableProps> = ({ datapointRuns, currentPage, totalPages }) => {
  return (
    <div>
      <div className={"mb-4 flex justify-end"}>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
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
    </div>
  );
};
