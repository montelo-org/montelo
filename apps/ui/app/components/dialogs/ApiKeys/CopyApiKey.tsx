import { Clipboard, ClipboardCheck } from "lucide-react";
import { useCopyToClipboard } from "~/hooks";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

type CopyApiKeyProps = {
  apiKey: string;
};
export const CopyApiKey = ({ apiKey }: CopyApiKeyProps) => {
  const [copied, copyToClipboard] = useCopyToClipboard();

  const handleClick = () => copyToClipboard(apiKey);

  const isCopied = copied.value === apiKey;
  const Icon = isCopied ? ClipboardCheck : Clipboard;

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Icon size={20} className="cursor-pointer hover:scale-110" onClick={handleClick} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{isCopied ? "Copied!" : "Copy API Key"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
