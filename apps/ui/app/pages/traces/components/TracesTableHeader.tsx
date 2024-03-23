import { LogDto } from "@montelo/browser-client";
import { TimerIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";
import { FC } from "react";
import "react-json-view-lite/dist/index.css";
import Pagination from "~/components/pagination";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { TimeFrames } from "../constants/timeframes";

type TracesTableHeaderProps = {
  searchQuery: string;
  selectedDate: TimeFrames;
  onSearch: (search: string) => void;
  onDateChange: (date: TimeFrames) => void;
  currentPage: number;
  totalPages: number;
};
export const TracesTableHeader: FC<TracesTableHeaderProps> = ({
  searchQuery,
  onSearch,
  selectedDate,
  onDateChange,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className={"flex gap-4"}>
        <div className="relative">
          <Input
            placeholder="Search by log name"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full rounded border py-2 pl-10 pr-4"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-4 w-4 text-gray-500" />
          </div>
        </div>
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
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex items-center justify-end space-x-2">
          <div className="space-x-2">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
};
