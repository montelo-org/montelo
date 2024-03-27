import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { useFetcherWithReset } from "~/hooks";
import { Routes } from "~/routes";
import { TableCell, TableRow } from "../../ui/table";
import { CopyApiKey } from "./CopyApiKey";
import { RevealApiKey } from "./RevealApiKey";
import { RotateApiKey } from "./RotateApiKey";

type ApiKeyRowProps = {
  apiKey: ApiKeyWithEnvDto;
  projectId: string;
};

export const ApiKeyRow = ({ apiKey, projectId }: ApiKeyRowProps) => {
  const revealFetcher = useFetcherWithReset<ApiKeyWithEnvDto>();
  const rotateFetcher = useFetcherWithReset<ApiKeyWithEnvDto>();

  const apiKeyToShow = rotateFetcher.data?.key ? undefined : revealFetcher.data?.key;

  const handleReveal = () => {
    revealFetcher.submit(null, {
      method: "POST",
      action: Routes.actions.apiKeys.reveal({
        projectId,
        apiKeyId: apiKey.id,
      }),
    });
    rotateFetcher.reset();
  };

  const handleRotate = () => {
    rotateFetcher.submit(null, {
      method: "POST",
      action: Routes.actions.apiKeys.rotate({
        projectId,
        apiKeyId: apiKey.id,
      }),
    });
    revealFetcher.reset();
  };

  return (
    <TableRow key={apiKey.envId}>
      <TableCell className="font-medium">{apiKey.environment.name}</TableCell>
      <TableCell>
        <div className="min-w-80">{apiKeyToShow || apiKey.key}</div>
      </TableCell>
      <TableCell>
        <div className="flex w-14 justify-between gap-1">
          <div>
            {apiKeyToShow ? (
              <CopyApiKey apiKey={apiKeyToShow} />
            ) : (
              !apiKey.viewed && <RevealApiKey onClick={handleReveal} />
            )}
          </div>
          <RotateApiKey handleRotate={handleRotate} />
        </div>
      </TableCell>
    </TableRow>
  );
};
