import { LogDtoTypeEnum } from "@montelo/browser-client";
import { GanttChart } from "lucide-react";

export const TypeMap = {
  [LogDtoTypeEnum.Manual]: (
    <div className="w-6 h-6 bg-blue-500 rounded p-1">
      <GanttChart className="w-full h-full" />
    </div>
  ),
  [LogDtoTypeEnum.Openai]: (
    <div className="w-6 h-6 bg-orange-500 rounded p-1">
      <img src="/openai.svg" alt="Openai Logo" className="w-full h-full" />
    </div>
  ),
};
