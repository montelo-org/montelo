import { Copy } from "lucide-react";
import { useCopyToClipboard } from "~/hooks";

type RevealedProps = {
  apiKey: string;
};
export const Revealed = ({ apiKey }: RevealedProps) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const handleClick = () => copyToClipboard(apiKey);

  return (
    <div className={"flex cursor-pointer flex-row gap-1 underline-offset-1 hover:underline"} onClick={handleClick}>
      <Copy size={16} />
      <p>{apiKey}</p>
    </div>
  );
};
