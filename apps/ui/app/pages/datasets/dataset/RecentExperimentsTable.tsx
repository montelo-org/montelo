import { ExperimentDto } from "@montelo/browser-client";
import { useNavigate, useParams } from "@remix-run/react";
import { Cell, ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import dayjs from "dayjs";
import { FlaskConical } from "lucide-react";
import { FC } from "react";
import { Badge } from "~/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { PageDocLink } from "~/pages/layouts/PageDocLink";
import { idShortener } from "~/pages/traces/utils";
import { Routes } from "~/routes";


const columns: ColumnDef<ExperimentDto>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      const { short, variant } = idShortener(id);
      return (
        <div>
          <Badge variant={variant}>{short}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div>{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div>{row.getValue("description")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Start Date",
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");
      const formatted = dayjs(date).format("MMM D YY / h:mm:ss a");
      return <div>{formatted}</div>;
    },
  },
];

export const RecentExperimentsTable: FC<{ experiments: ExperimentDto[] }> = ({ experiments }) => {
  const navigate = useNavigate();
  const params = useParams();

  const table = useReactTable({
    data: experiments,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (row: Cell<ExperimentDto, unknown>) => {
    const experimentId = row.row.original.id;
    navigate(
      Routes.app.project.env.experimentsId({
        projectId: params.projectId!,
        envId: params.envId!,
        experimentId,
      }),
    );
  };

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
                    <TableCell key={cell.id} onClick={() => handleRowClick(cell)}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
