import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "../../ui/alert";
import { DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../ui/table";
import { ApiKeyRow } from "./ApiKeyRow";

type ApiKeysDialogContentProps = {
  sortedEnvironments: ApiKeyWithEnvDto[];
  projectId: string;
};

export const ApiKeysDialogContent = ({ sortedEnvironments, projectId }: ApiKeysDialogContentProps) => {
  return (
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
  );
};
