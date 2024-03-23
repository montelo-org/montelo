import { ExperimentDto } from "@montelo/browser-client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { FlaskConical } from "lucide-react";
import { FC } from "react";
import { Badge } from "~/components/ui/badge";
import { ExperimentsTable } from "~/pages/experiments/ExperimentsTable";
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
        <ExperimentsTable experiments={experiments} />
      </div>
    </div>
  );
};
