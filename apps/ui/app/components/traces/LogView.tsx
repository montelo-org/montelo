import { LogDto } from "@montelo/browser-client";
import { FC } from "react";
import { MessagesView } from "~/components/traces/MessagesView/MessagesView";
import {
  AnalyticsContainer,
  AnalyticsMajorStat,
  AnalyticsMinorStat,
  AnalyticsTitle,
  SingleContainer,
  StatsContainer,
} from "./LogAnalytics/LogAnalytics.styles";
import { formatDate, formatNumber } from "./LogAnalytics/utils";

type Props = {
  log: LogDto;
};

export const LogView: FC<Props> = ({ log }) => {
  return (
    <div className={"ml-4"}>
      <div className={"mb-2"}>
        <h1 className={"text-xl"}>{log.name || "—"}</h1>
      </div>
      <div className={"mb-4 flex flex-row gap-4"}>
        <AnalyticsContainer>
          <SingleContainer className={"bg-background rounded-l-xl"}>
            <div className={"flex flex-col"}>
              <AnalyticsTitle className={"mb-2"}>General</AnalyticsTitle>
              <AnalyticsMinorStat>Model ➯ {log.model}</AnalyticsMinorStat>
            </div>
          </SingleContainer>

          <SingleContainer>
            <StatsContainer>
              <AnalyticsTitle>Cost</AnalyticsTitle>
              <AnalyticsMajorStat>{log.totalCost ? `$${log.totalCost}` : "—"}</AnalyticsMajorStat>
              <AnalyticsMinorStat>Input ➯ {log.inputCost ? `$${log.inputCost}` : "—"}</AnalyticsMinorStat>
              <AnalyticsMinorStat>Output ➯ {log.outputCost ? `$${log.outputCost}` : "—"}</AnalyticsMinorStat>
            </StatsContainer>
          </SingleContainer>

          <SingleContainer>
            <StatsContainer>
              <AnalyticsTitle>Tokens</AnalyticsTitle>
              <AnalyticsMajorStat>{log.totalTokens ? formatNumber(log.totalTokens) : "—"}</AnalyticsMajorStat>
              <AnalyticsMinorStat>Input ➯ {log.inputTokens ? formatNumber(log.inputTokens) : "—"}</AnalyticsMinorStat>
              <AnalyticsMinorStat>
                Output ➯ {log.outputTokens ? formatNumber(log.outputTokens) : "—"}
              </AnalyticsMinorStat>
            </StatsContainer>
          </SingleContainer>

          <SingleContainer>
            <StatsContainer>
              <AnalyticsTitle>Latency</AnalyticsTitle>
              <AnalyticsMajorStat>{log.duration ? `${log.duration}s` : "—"}</AnalyticsMajorStat>
              <AnalyticsMinorStat>Start ➯ {log.startTime ? formatDate(log.startTime) : "—"}</AnalyticsMinorStat>
              <AnalyticsMinorStat>End ➯ {log.endTime ? formatDate(log.endTime) : "—"}</AnalyticsMinorStat>
            </StatsContainer>
          </SingleContainer>
        </AnalyticsContainer>
      </div>

      <MessagesView input={log.input} output={log.output} extra={log.extra} source={log.source} />
    </div>
  );
};
