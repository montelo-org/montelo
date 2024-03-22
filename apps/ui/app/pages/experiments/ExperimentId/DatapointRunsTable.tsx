import { DatapointRunDto } from "@montelo/browser-client";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Link, useNavigate, useParams } from "@remix-run/react";
import { FC } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Routes } from "~/routes";

export const DatapointRunsTable: FC<{ datapointRuns: DatapointRunDto[] }> = ({ datapointRuns }) => {
  const navigate = useNavigate();
  const params = useParams();

  const onCellClick = (datapointRun: DatapointRunDto) => {
    // navigate(
    //   Routes.app.project.env.experimentsId({
    //     projectId: params.projectId!,
    //     envId: params.envId!,
    //     experimentId: experiment.id,
    //   }),
    // );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Output</TableHead>
          <TableHead>View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datapointRuns.map((datapointRun) => (
          <TableRow
            key={datapointRun.id}
            onClick={() => {
              onCellClick(datapointRun);
            }}
          >
            <TableCell>{datapointRun.id}</TableCell>
            <TableCell>{JSON.stringify(datapointRun.output)}</TableCell>
            <TableCell>
              <Link
                to={Routes.app.project.env.datapointRunId({
                  projectId: params.projectId!,
                  envId: params.envId!,
                  experimentId: params.experimentId!,
                  datapointRunId: datapointRun.id,
                })}
              >
                <ExternalLinkIcon></ExternalLinkIcon>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
