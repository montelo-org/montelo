import { LogDto } from "@montelo/browser-client";
import { ChevronDownIcon, TimerIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";
import "react-json-view-lite/dist/index.css";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { TimeFrames } from "../constants/timeframes";

type TracesTableHeaderProps = {
  table: Table<LogDto>;
  searchQuery: string;
  selectedDate: TimeFrames;
  onSearch: (search: string) => void;
  onDateChange: (date: TimeFrames) => void;
};
export const TracesTableHeader = ({
  searchQuery,
  onSearch,
  selectedDate,
  onDateChange,
  table,
}: TracesTableHeaderProps) => {
  return (
    <div className="flex items-center pb-4 pt-0.5 justify-between">
      <div className="relative w-1/4">
        <Input
          placeholder="Search by log name, input or output"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full rounded border py-2 pl-10 pr-4"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <div>
          <Select value={selectedDate} onValueChange={onDateChange}>
            <SelectTrigger className="w-[120px]">
              <div className="flex items-center gap-2">
                <TimerIcon />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={TimeFrames.LAST_15_MINUTES}>15 mins</SelectItem>
                <SelectItem value={TimeFrames.LAST_30_MINUTES}>30 mins</SelectItem>
                <SelectItem value={TimeFrames.LAST_HOUR}>1 hr</SelectItem>
                <SelectItem value={TimeFrames.LAST_DAY}>24 hrs</SelectItem>
                <SelectItem value={TimeFrames.LAST_3_DAYS}>3 days</SelectItem>
                <SelectItem value={TimeFrames.LAST_7_DAYS}>7 days</SelectItem>
                <SelectItem value={TimeFrames.LAST_30_DAYS}>1 month</SelectItem>
                <SelectItem value={TimeFrames.ALL_TIME}>All time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={column.toggleVisibility}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
