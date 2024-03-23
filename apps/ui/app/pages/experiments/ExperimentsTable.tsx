import { ExperimentDto } from "@montelo/browser-client";
import { FC } from "react";
import Pagination from "~/components/pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { ExperimentCell } from "~/pages/experiments/ExperimentCell";

type ExperimentsTableProps = {
  experiments: ExperimentDto[];
  totalCount?: number;
  currentPage?: number;
};

export const ExperimentsTable: FC<ExperimentsTableProps> = ({ experiments, currentPage, totalCount }) => {
  const showPagination = totalCount && currentPage;
  return (
    <div>
      {showPagination && (
        <div className={"mb-4 flex justify-end"}>
          <Pagination currentPage={currentPage} totalPages={totalCount} />
        </div>
      )}
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
    </div>
  );
};
