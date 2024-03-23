import { Clipboard, ClipboardCheck } from "lucide-react";
import { useCopyToClipboard } from "~/hooks";

type RevealedProps = {
  apiKey: string;
};
export const Revealed = ({ apiKey }: RevealedProps) => {
  const [copied, copyToClipboard] = useCopyToClipboard();

  const handleClick = () => copyToClipboard(apiKey);

  const isCopied = copied.value === apiKey;
  const Icon = isCopied ? ClipboardCheck : Clipboard;

  return (
    <div className={"flex cursor-pointer flex-row gap-1 underline-offset-1 hover:underline"} onClick={handleClick}>
      <Icon size={16} />
      <p>{apiKey}</p>
    </div>
  );
};
