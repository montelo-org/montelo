import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { useFetcher } from "@remix-run/react";
import { KeyRound } from "lucide-react";
import { FC } from "react";
import { ApiKeysDialogContent } from "~/components/dialogs/ApiKeys/ApiKeysDialogContent";
import { Routes } from "~/routes";
import { sortApiKeys } from "~/utils/sorters";
import { Dialog, DialogTrigger } from "../../ui/dialog";

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
      <ApiKeysDialogContent sortedEnvironments={sortedEnvironments} projectId={projectId} />
    </Dialog>
  );
};
