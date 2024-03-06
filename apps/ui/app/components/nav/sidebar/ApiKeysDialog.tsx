import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { AlertTriangle, KeyRound } from "lucide-react";
import { Alert, AlertDescription } from "../../ui/alert";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../ui/table";
import { ApiKeyRow } from "../../dialogs/ApiKeys/ApiKeyRow";
import { useFetcher } from "@remix-run/react";
import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { Routes } from "../../../routes";
import { FC } from "react";
import { sortApiKeys } from "../../../utils/sorters";

type ApiKeysDialogProps = {
  projectId: string;
}

export const ApiKeysDialog: FC<ApiKeysDialogProps> = ({ projectId }) => {
  const fetcher = useFetcher<ApiKeyWithEnvDto[]>();

  const prefetchApiKeys = () => fetcher.load(Routes.actions.project.getAllApiKeys(projectId));

  const sortedEnvironments = sortApiKeys(fetcher.data || []);

  return (
    <Dialog>
      <DialogTrigger asChild onMouseEnter={prefetchApiKeys}>
        <div className={"flex items-center py-1 group hover:bg-muted/50 rounded cursor-pointer"}>
          <div className={"flex justify-center w-8"}>
            {<KeyRound size={20} className={"group-hover:text-foreground text-muted-foreground"} />}
          </div>
          <span className="ml-1 whitespace-nowrap text-muted-foreground">API Keys</span>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>API Keys</DialogTitle>
        </DialogHeader>
        <div>
          <Alert variant="destructive" className={"mb-4"}>
            <AlertDescription>
              <div className={"flex flex-row items-center gap-4"}>
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
              {sortedEnvironments.map((apiKey) => <ApiKeyRow key={apiKey.id} apiKey={apiKey} />)}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
