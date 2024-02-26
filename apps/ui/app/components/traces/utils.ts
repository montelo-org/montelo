import { LogDto } from "@montelo/browser-client";

export type LogDtoWithDepth = LogDto & { depth: number };

export const buildTree = (logs: LogDto[]): LogDtoWithDepth[] => {
  const calculateDepth = (log: LogDto, currentLogs: LogDto[]): number => {
    let depth = 0;
    let current = log;

    while (current.parentLogId) {
      const parent = currentLogs.find((l) => l.id === current.parentLogId);
      if (parent) {
        depth++;
        current = parent;
      } else {
        break;
      }
    }

    return depth;
  };

  return logs.map((log) => ({
    ...log,
    depth: calculateDepth(log, logs),
  }));
};
