import { TraceWithLogsDto } from "@montelo/browser-client";
import dayjs from "dayjs";
import { DollarSign, Info, Timer, WholeWord } from "lucide-react";
import { FC } from "react";
import {
  AnalyticsContainer,
  AnalyticsMajorStat,
  AnalyticsMinorStat,
  AnalyticsTitle,
  IconWrapper,
  SingleContainer,
  StatsContainer,
} from "./LogAnalytics.styles";
import { formatDate, formatNumber } from "./utils";

type Props = {
  trace: TraceWithLogsDto;
};
export const TraceAnalytics: FC<Props> = ({ trace }) => {
  return (
    <AnalyticsContainer>
      <SingleContainer className={"bg-background rounded-l-xl"}>
        <StatsContainer>
          <AnalyticsTitle className={"mb-2"}>General</AnalyticsTitle>
          <AnalyticsMinorStat>Started ➯ {dayjs(trace.startTime).format("MMM D, YYYY")}</AnalyticsMinorStat>
          <AnalyticsMinorStat>User ID ➯ {trace.userId || "Not provided"}</AnalyticsMinorStat>
          <AnalyticsMinorStat>Tags ➯ {trace.tags.length ? trace.tags.join(",") : "Not provided"}</AnalyticsMinorStat>
        </StatsContainer>
        <IconWrapper Icon={Info} />
      </SingleContainer>

      <SingleContainer>
        <StatsContainer>
          <AnalyticsTitle>Cost</AnalyticsTitle>
          <AnalyticsMajorStat>$ {trace.totalCost}</AnalyticsMajorStat>
          <AnalyticsMinorStat>Input ➯ $ {trace.inputCost}</AnalyticsMinorStat>
          <AnalyticsMinorStat>Output ➯ $ {trace.outputCost}</AnalyticsMinorStat>
        </StatsContainer>
        <IconWrapper Icon={DollarSign} />
      </SingleContainer>

      <SingleContainer>
        <StatsContainer>
          <AnalyticsTitle>Tokens</AnalyticsTitle>
          <AnalyticsMajorStat>{formatNumber(trace.totalTokens)}</AnalyticsMajorStat>
          <AnalyticsMinorStat>Input ➯ {formatNumber(trace.inputTokens)}</AnalyticsMinorStat>
          <AnalyticsMinorStat>Output ➯ {formatNumber(trace.outputTokens)}</AnalyticsMinorStat>
        </StatsContainer>
        <IconWrapper Icon={WholeWord} />
      </SingleContainer>

      <SingleContainer>
        <StatsContainer>
          <AnalyticsTitle>Latency</AnalyticsTitle>
          <AnalyticsMajorStat>{trace.duration}s</AnalyticsMajorStat>
          <AnalyticsMinorStat>Start ➯ {formatDate(trace.startTime)}</AnalyticsMinorStat>
          <AnalyticsMinorStat>End ➯ {formatDate(trace.endTime)}</AnalyticsMinorStat>
        </StatsContainer>
        <IconWrapper Icon={Timer} />
      </SingleContainer>

      <SingleContainer className={"bg-background rounded-r-xl"}>
        <div className={"flex flex-col"}>
          <AnalyticsTitle className={"mb-2"}>Extra</AnalyticsTitle>
          {trace.extra ? (
            Object.entries(trace.extra).map(([key, value]) => (
              <AnalyticsMinorStat key={key}>
                {key} ➯ {value.toString()}
              </AnalyticsMinorStat>
            ))
          ) : (
            <AnalyticsMinorStat>None provided</AnalyticsMinorStat>
          )}
        </div>
      </SingleContainer>
    </AnalyticsContainer>
  );
};
