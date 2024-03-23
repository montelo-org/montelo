import { RefreshCcw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

type RotateApiKeyProps = {
  handleRotate: () => void;
};
export const RotateApiKey = ({ handleRotate }: RotateApiKeyProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <RefreshCcw
            size={20}
            className="cursor-pointer hover:scale-110"
            onClick={handleRotate}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Rotate</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
