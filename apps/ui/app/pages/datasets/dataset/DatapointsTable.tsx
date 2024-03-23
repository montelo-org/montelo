import type { DatapointDto } from "@montelo/browser-client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useFetcher, useParams } from "@remix-run/react";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { CircleDotDashed, Trash } from "lucide-react";
import * as React from "react";
import { FC } from "react";
import Pagination from "~/components/pagination";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { PageDocLink } from "~/pages/layouts/PageDocLink";
import { idShortener } from "~/pages/traces/utils";
import { Routes } from "~/routes";


export const columns: ColumnDef<DatapointDto>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      const { short, variant } = idShortener(id);

      return (
        <div className={"max-w-8"}>
          <Badge variant={variant}>{short}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "input",
    header: "Input",
    cell: ({ row }) => {
      const val = row.getValue("input") as object;
      const stringified = JSON.stringify(val);
      const short = stringified.slice(0, 100);
      return <div>{short.length === stringified.length ? short : `${short}...`}</div>;
    },
  },
  {
    accessorKey: "expectedOutput",
    header: "Expected Output",
    cell: ({ row }) => {
      const val = row.getValue("expectedOutput") as object;
      const stringified = JSON.stringify(val);
      const short = stringified.slice(0, 100);
      return <div>{short.length === stringified.length ? short : `${short}...`}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const params = useParams();
      const fetcher = useFetcher();
      const { id: datapointId } = row.original;

      const handleDeleteDatapoint = () => {
        fetcher.submit(null, {
          method: "DELETE",
          action: Routes.actions.datapoints.delete({
            projectId: params.projectId!,
            datapointId,
          }),
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className={"text-destructive gap-2"} onClick={handleDeleteDatapoint}>
              <Trash size={16} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type DatapointsTableProps = {
  datapoints: DatapointDto[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export const DatapointsTable: FC<DatapointsTableProps> = ({ datapoints, currentPage, totalPages, totalCount }) => {
  const table = useReactTable({
    data: datapoints,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <p className={"text-xl font-semibold flex gap-2 items-center"}>
        <CircleDotDashed size={20} />
        Datapoints
      </p>
      <p className={"text-muted-foreground mb-4"}>
        Each datapoint is a single input and expected output pair.{" "}
        <PageDocLink to={Routes.external.documentation}>Datapoints Docs.</PageDocLink>
      </p>

      <div className="flex items-center justify-end mb-2">
        <div className="space-x-2">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>

      <div className="mb-2 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No data points.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-muted-foreground flex flex-1 justify-end text-sm">
        {table.getFilteredRowModel().rows.length} datapoints.
      </div>
    </div>
  );
};
