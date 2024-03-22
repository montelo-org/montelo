import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { useFetcher } from "@remix-run/react";
import { AlertTriangle, KeyRound } from "lucide-react";
import { FC } from "react";
import { Routes } from "~/routes";
import { sortApiKeys } from "~/utils/sorters";
import { ApiKeyRow } from "../../dialogs/ApiKeys/ApiKeyRow";
import { Alert, AlertDescription } from "../../ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../ui/table";

type ApiKeysDialogProps = {
  projectId: string;
};

export const ApiKeysDialog: FC<ApiKeysDialogProps> = ({ projectId }) => {
  const fetcher = useFetcher<ApiKeyWithEnvDto[]>();

  const prefetchApiKeys = () => fetcher.load(Routes.actions.project.getAllApiKeys(projectId));

  const sortedEnvironments = sortApiKeys(fetcher.data || []);

  return (
    <Dialog>
      <DialogTrigger asChild onMouseEnter={prefetchApiKeys}>
        <div
          className={"hover:bg-muted flex cursor-pointer items-center rounded-xl px-2.5 py-2 dark:hover:bg-[#151218]"}
        >
          <div className={"flex w-8 justify-center"}>{<KeyRound className={"text-muted-foreground h-4 w-4"} />}</div>
          <span className="text-muted-foreground ml-1.5 whitespace-nowrap text-sm">API Keys</span>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle>API Keys</DialogTitle>
        </DialogHeader>
        <div>
          <Alert variant="destructive" className={"mb-4"}>
            <AlertDescription>
              <div className={"text-destructive-foreground flex flex-row items-center gap-4"}>
                <AlertTriangle />
                API keys are only revealed once and will be hidden after.
              </div>
            </AlertDescription>
          </Alert>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Environment</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEnvironments.map((apiKey) => (
                <ApiKeyRow key={apiKey.id} apiKey={apiKey} projectId={projectId} />
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
