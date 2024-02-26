import React, { FC, useEffect, useRef, useState } from "react";
import { LogDto } from "@montelo/browser-client";
import { buildTree } from "./utils";
import { ScrollArea } from "../ui/scroll-area";
import { TypeMap } from "./TypeMap";

type Props = {
  logs: LogDto[];
  selectedId: string;
  handleSelect: (id: string) => void;
};

const LogTreeNode: FC<{
  // isFirst: boolean;
  // isLast: boolean;
  log: LogDto;
  onSelect: (id: string) => void;
  selectedId: string;
  depth: number;
}> = ({ log, onSelect, selectedId, depth }) => {
  const isNodeSelected = selectedId === log.id;

  const handleClick = () => {
    if (isNodeSelected) {
      return;
    }
    onSelect(log.id);
  };

  return (
    <div
      className={`
      px-4 py-2
      hover:bg-secondary 
      dark:hover:bg-secondary/25
      cursor-pointer
      ${depth ? `pl-${4 + ((depth + 1) * 2)}` : ""}
      ${isNodeSelected ? "bg-secondary dark:bg-secondary/25" : ""} 
      `}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        {TypeMap[log.type]}
        <span className="flex gap-4 items-baseline">
          {log.name}
          <span className={"text-sm text-muted-foreground"}>{log.duration ? `${log.duration}s` : ""}</span>
        </span>
      </div>
    </div>
  );
};

export const LogsTreeView: FC<Props> = ({ logs, selectedId, handleSelect }) => {
  // build the tree of logs
  const treeLogs = buildTree(logs);

  // offset calculations
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetTop, setOffsetTop] = useState(0);
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setOffsetTop(rect.top);
    }
  }, []);

  return (
    <div>
      <div className={"mb-2"}>
        <h1 className={"text-xl"}>Logs</h1>
      </div>
      <ScrollArea>
        <div
          ref={containerRef}
          // className={"border rounded-xl"}
          style={{ minHeight: `calc(100vh - ${offsetTop}px - 16px)` }}>
          {treeLogs.map((log, index) => (
            <LogTreeNode
              key={log.id}
              // isFirst={index === 0}
              // isLast={index === treeLogs.length - 1}
              log={log}
              onSelect={handleSelect}
              selectedId={selectedId}
              depth={log.depth}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
