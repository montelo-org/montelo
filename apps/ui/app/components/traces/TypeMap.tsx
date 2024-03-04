import { LogDtoSourceEnum } from "@montelo/browser-client";
import { GanttChart } from "lucide-react";

export const TypeMap = {
  [LogDtoSourceEnum.Manual]: (
    <div className="w-6 h-6 bg-blue-500 rounded p-1">
      <GanttChart className="w-full h-full" />
    </div>
  ),
  [LogDtoSourceEnum.Openai]: (
    <div className="w-6 h-6 bg-orange-500 rounded p-1">
      <img src="/openai.svg" alt="Openai Logo" className="w-full h-full" />
    </div>
  ),
  // TODO add other sources
  [LogDtoSourceEnum.Anthropic]: (
    <div className="w-6 h-6 bg-orange-500 rounded p-1">
      <img src="/openai.svg" alt="Openai Logo" className="w-full h-full" />
    </div>
  ),
  [LogDtoSourceEnum.Mistral]: (
    <div className="w-6 h-6 bg-orange-500 rounded p-1">
      <img src="/openai.svg" alt="Openai Logo" className="w-full h-full" />
    </div>
  ),
  [LogDtoSourceEnum.Cohere]: (
    <div className="w-6 h-6 bg-orange-500 rounded p-1">
      <img src="/openai.svg" alt="Openai Logo" className="w-full h-full" />
    </div>
  ),
};
