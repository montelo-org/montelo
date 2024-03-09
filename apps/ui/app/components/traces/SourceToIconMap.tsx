import { LogDtoSourceEnum } from "@montelo/browser-client";
import { GanttChart } from "lucide-react";

export const SourceToIconMap: Record<LogDtoSourceEnum, JSX.Element> = {
  [LogDtoSourceEnum.Manual]: (
    <div className="h-6 w-6 rounded bg-blue-500 p-1">
      <GanttChart className="h-full w-full" />
    </div>
  ),
  [LogDtoSourceEnum.Openai]: (
    <div className="h-6 w-6 rounded bg-orange-500 p-1">
      <img src="/openai.svg" alt="Openai Logo" className="h-full w-full" />
    </div>
  ),
  // TODO add other sources
  [LogDtoSourceEnum.Anthropic]: (
    <div className="h-6 w-6 rounded bg-orange-500 p-1">
      <img src="/openai.svg" alt="Openai Logo" className="h-full w-full" />
    </div>
  ),
  [LogDtoSourceEnum.Mistral]: (
    <div className="h-6 w-6 rounded bg-orange-500 p-1">
      <img src="/openai.svg" alt="Openai Logo" className="h-full w-full" />
    </div>
  ),
  [LogDtoSourceEnum.Cohere]: (
    <div className="h-6 w-6 rounded bg-orange-500 p-1">
      <img src="/openai.svg" alt="Openai Logo" className="h-full w-full" />
    </div>
  ),
};
