import { AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum } from "@montelo/browser-client";
import { TimerIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";


type DateSelectorProps = {
  selectedValue: string;
  setSearchParams: (fn: (prev: URLSearchParams) => URLSearchParams) => void;
};

export const DateSelector: FC<DateSelectorProps> = ({ selectedValue, setSearchParams }) => {
  return (
    <Select
      value={selectedValue}
      onValueChange={(value) => {
        setSearchParams((prev) => {
          prev.set("dateSelection", value);
          return prev;
        });
      }}
    >
      <SelectTrigger className="w-[125px]">
        <TimerIcon />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._30Mins}>30 mins</SelectItem>
          <SelectItem value={AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._1Hr}>1 hr</SelectItem>
          <SelectItem value={AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._24Hrs}>24 hrs</SelectItem>
          <SelectItem value={AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._7Days}>7 days</SelectItem>
          <SelectItem value={AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._1Month}>1 month</SelectItem>
          <SelectItem value={AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._3Months}>3 months</SelectItem>
          <SelectItem value={AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum.AllTime}>All time</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
