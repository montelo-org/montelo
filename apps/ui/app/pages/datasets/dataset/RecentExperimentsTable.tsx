import { ExperimentDto } from "@montelo/browser-client";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { FlaskConical } from "lucide-react";
import { FC } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { PageDocLink } from "~/pages/layouts/PageDocLink";
import { Routes } from "~/routes";

const columns: ColumnDef<ExperimentDto>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div>{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div>{row.getValue("name")}</div>;
    },
  },
];

export const RecentExperimentsTable: FC<{ experiments: ExperimentDto[] }> = ({ experiments }) => {
  const table = useReactTable({
    data: experiments,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <p className={"flex items-center gap-2 text-xl font-semibold"}>
        <FlaskConical size={20} />
        Experiments
      </p>
      <p className={"text-muted-foreground mb-4"}>
        Recent experiments ran against this dataset.{" "}
        <PageDocLink to={Routes.external.documentation}>Experiments Docs.</PageDocLink>
      </p>
      <div className="rounded-md border">
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
                  No experiments ran.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
