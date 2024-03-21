import { LogDto } from "@montelo/browser-client";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "@remix-run/react";
import {
  ColumnFiltersState,
  OnChangeFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { useEffect } from "react";
import "react-json-view-lite/dist/index.css";
import { PageBreadcrumbContainer } from "~/components/PageBreadcrumbContainer";
import { BreadcrumbItem, BreadcrumbPage } from "~/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { useDebounceValue } from "~/hooks/useDebounceValue";
import Pagination from "../../components/pagination";
import { TracesTableHeader } from "./components/TracesTableHeader";
import { COLUMNS } from "./constants";
import { TimeFrames } from "./constants/timeframes";

type TracesPageProps = {
  logs: LogDto[];
  currentPage: number;
  totalPages: number;
};

export function TracesPage({ logs, currentPage, totalPages }: TracesPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = React.useState<TimeFrames>(
    (searchParams.get("date") as TimeFrames) || TimeFrames.LAST_HOUR,
  );
  const [searchQuery, setSearchQuery] = React.useState(searchParams.get("q") || "");
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 300);

  const paramsSortColumn = searchParams.get("sortColumn");
  const paramsSortDirection = searchParams.get("sortDirection");
  const defaultSorting: SortingState =
    paramsSortColumn && paramsSortDirection ? [{ id: paramsSortColumn, desc: paramsSortDirection === "desc" }] : [];
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    inputTokens: false,
    outputTokens: false,
    inputCost: false,
    outputCost: false,
  });
  const [rowSelection, setRowSelection] = React.useState({});

  const onDateChange = (value: TimeFrames) => {
    setSelectedDate(value);
    setSearchParams((prev) => {
      prev.set("date", value);
      return prev;
    });
  };

  const onSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    setSorting((oldSorting) => {
      const newSorting = typeof updaterOrValue === "function" ? updaterOrValue(oldSorting) : updaterOrValue;
      const params = new URLSearchParams(searchParams.toString());
      const sortColumn = newSorting.length ? newSorting[0].id : undefined;
      const sortDirection = newSorting.length ? (newSorting[0].desc ? "desc" : "asc") : undefined;

      if (sortColumn && sortDirection) {
        params.set("sortColumn", sortColumn);
        params.set("sortDirection", sortDirection);
      } else {
        params.delete("sortColumn");
        params.delete("sortDirection");
      }
      setSearchParams(params);

      return newSorting;
    });
  };

  const updateSearchQueryParam = () => {
    setSearchParams((prev) => {
      if (debouncedSearchQuery) {
        prev.set("q", debouncedSearchQuery);
      } else {
        prev.delete("q");
      }
      return prev;
    });
  };
  useEffect(updateSearchQueryParam, [debouncedSearchQuery]);

  const table = useReactTable({
    data: logs,
    columns: COLUMNS,
    manualPagination: true,
    manualSorting: true,
    enableSorting: true,
    onSortingChange,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full pt-2">
      <PageBreadcrumbContainer>
        <BreadcrumbItem>
          <BreadcrumbPage className={"text-lg"}>Traces</BreadcrumbPage>
        </BreadcrumbItem>
      </PageBreadcrumbContainer>

      <TracesTableHeader
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onDateChange={onDateChange}
        selectedDate={selectedDate}
        table={table}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <TableHead
                      className={header.column.getCanSort() ? "hover:text-accent-foreground cursor-pointer" : ""}
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className={"flex items-center gap-1" + (isSorted ? " font-semibold" : "")}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        <span>
                          {isSorted &&
                            (header.column.getIsSorted() === "desc" ? <ChevronDownIcon /> : <ChevronUpIcon />)}
                        </span>
                      </div>
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
                <TableCell colSpan={COLUMNS.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
