import { SearchIcon } from "lucide-react";
import { FC } from "react";
import "react-json-view-lite/dist/index.css";
import Pagination from "~/components/pagination";
import { Input } from "~/components/ui/input";

type TracesTableHeaderProps = {
  searchQuery: string;
  onSearch: (search: string) => void;
  currentPage: number;
  totalPages: number;
};
export const TracesTableHeader: FC<TracesTableHeaderProps> = ({ searchQuery, onSearch, currentPage, totalPages }) => {
  return (
    <div className="gap- mb-4 flex items-center justify-between">
      <div className={"relative flex max-w-[400px] flex-1"}>
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
