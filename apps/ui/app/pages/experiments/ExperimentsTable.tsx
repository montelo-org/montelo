import { ExperimentDto } from "@montelo/browser-client";
import { FC } from "react";
import Pagination from "~/components/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { ExperimentCell } from "~/pages/experiments/ExperimentCell";

type ExperimentsTableProps = {
  experiments: ExperimentDto[];
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
};

export const ExperimentsTable: FC<ExperimentsTableProps> = ({ experiments, currentPage, totalCount, totalPages }) => {
  const showPagination = !!totalCount && currentPage && totalPages;
  return (
    <div>
      {showPagination && (
        <div className={"mb-2 flex justify-between"}>
          <div>
            <span className={"text-muted-foreground text-sm"}>
              {totalCount} experiment{totalCount >= 2 ? "s" : ""}
            </span>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
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
          {experiments.length ? (
            experiments.map((experiment) => <ExperimentCell key={experiment.id} experiment={experiment} />)
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No experiments.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
