import { ApiKeyWithEnvDto } from "@montelo/browser-client";
import { useFetcherWithReset } from "~/hooks";
import { Routes } from "~/routes";
import { TableCell, TableRow } from "../../ui/table";
import { RevealApiKey } from "./RevealApiKey";
import { Revealed } from "./Revealed";
import { RotateApiKey } from "./RotateApiKey";

type ApiKeyRowProps = {
  apiKey: ApiKeyWithEnvDto;
};

export const ApiKeyRow = ({ apiKey }: ApiKeyRowProps) => {
  const revealFetcher = useFetcherWithReset<ApiKeyWithEnvDto>();
  const rotateFetcher = useFetcherWithReset<ApiKeyWithEnvDto>();

  const apiKeyToShow = rotateFetcher.data?.key ? undefined : revealFetcher.data?.key;

  const handleReveal = () => {
    revealFetcher.submit(null, {
      method: "POST",
      action: Routes.actions.apiKeys.reveal(apiKey.id),
    });
    rotateFetcher.reset();
  };

  const handleRotate = () => {
    rotateFetcher.submit(null, {
      method: "POST",
      action: Routes.actions.apiKeys.rotate(apiKey.id),
    });
    revealFetcher.reset();
  };

  return (
    <TableRow key={apiKey.envId}>
      <TableCell className="font-medium">{apiKey.environment.name}</TableCell>
      <TableCell>{apiKeyToShow ? <Revealed apiKey={apiKeyToShow} /> : apiKey.key}</TableCell>
      <TableCell>
        <div className="grid grid-cols-2 gap-1">
          <div>{!apiKey.viewed && <RevealApiKey onClick={handleReveal} />}</div>
          <RotateApiKey handleRotate={handleRotate} />
        </div>
      </TableCell>
    </TableRow>
  );
};
