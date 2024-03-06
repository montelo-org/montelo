import {  DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
} from "@tanstack/react-table";
import { LogDto } from "@montelo/browser-client";
import "react-json-view-lite/dist/index.css";
import dayjs from "dayjs";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { idShortener } from "../utils/idShortener";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { Link, useFetcher, useParams } from "@remix-run/react";
import { Routes } from "~/routes";
import { Badge } from "~/components/ui/badge";
import { Eye, Trash } from "lucide-react";

export const COLUMNS: ColumnDef<(LogDto & { orgId: string; })>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "startTime",
    header: "Timestamp",
    cell: ({ row }) => {
      const date: string | undefined = row.getValue("startTime") || row.original.createdAt;
      return (<div>{date && dayjs(date).format("h:mm:ssa - D/M/YY")}</div>);
    },
  },
  {
    accessorKey: "traceId",
    header: "Trace",
    cell: ({ row }) => {
      const orgId: string = row.original.orgId;
      const params = useParams();
      const traceId: string = row.getValue("traceId");
      const { short, variant } = idShortener(traceId);

      return (
        <div>
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger>
                <Link to={Routes.app.project.env.traceId({
                  projectId: params.projectId!,
                  envId: params.envId!,
                  traceId,
                })}>
                  <Badge variant={variant}>
                    {short}
                  </Badge>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{traceId}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Log",
    cell: ({ row }) => {
      const params = useParams();
      const name = row.original.name.substring(0, 15);
      const orgId: string = row.original.orgId;
      const traceId: string = row.getValue("traceId");
      const logId: string = row.getValue("id");
      const { short } = idShortener(logId);

      return (
        <div>
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger>
                <Link to={Routes.app.project.env.traceId({
                  projectId: params.projectId!,
                  envId: params.envId!,
                  traceId,
                  logId,
                })}>
                  <Badge>
                    {short} — {name}{name.length !== row.original.name.length && "..."}
                  </Badge>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{logId}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => (
      <div>{row.getValue("model") || "—"}</div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration: string | undefined = row.getValue("duration");
      return (
        <div>{duration ? `${duration}s` : "—"}</div>
      );
    },
  },
  {
    accessorKey: "inputTokens",
    header: "Input Tokens",
    cell: ({ row }) => (
      <div>{row.getValue("inputTokens") ?? "—"}</div>
    ),
  },
  {
    accessorKey: "outputTokens",
    header: "Output Tokens",
    cell: ({ row }) => (
      <div>{row.getValue("outputTokens") ?? "—"}</div>
    ),
  },
  {
    accessorKey: "totalTokens",
    header: "Total Tokens",
    cell: ({ row }) => (
      <div>{row.getValue("totalTokens") ?? "—"}</div>
    ),
  },
  {
    accessorKey: "inputCost",
    header: "Input Cost",
    cell: ({ row }) => {
      const inputCost: number | undefined = row.getValue("inputCost");
      return (
        <div>{inputCost ? `$${inputCost}` : "—"}</div>
      );
    },
  },
  {
    accessorKey: "outputCost",
    header: "Output Cost",
    cell: ({ row }) => {
      const outputCost: number | undefined = row.getValue("outputCost");
      return (
        <div>{outputCost ? `$${outputCost}` : "—"}</div>
      );
    },
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
    cell: ({ row }) => {
      const totalCost: number | undefined = row.getValue("totalCost");
      return (
        <div>{totalCost ? `$${totalCost}` : "—"}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const fetcher = useFetcher();
      const traceId = row.getValue("traceId") as string;

      const handleDelete = () => {
        fetcher.submit({ traceId }, { method: "post", action: Routes.actions.trace.delete });
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className={"gap-2"} disabled>
              <Eye size={16} /> Quick View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={"gap-2 text-red-600"} onClick={handleDelete}>
              <Trash size={16} /> Delete Trace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
