import { LogDto } from "@montelo/browser-client";
import { FC } from "react";
import {
  AnalyticsContainer,
  AnalyticsMajorStat,
  AnalyticsMinorStat,
  AnalyticsTitle,
  SingleContainer,
  StatsContainer,
} from "./LogAnalytics/LogAnalytics.styles";
import { formatDate, formatNumber } from "./LogAnalytics/utils";

type RawHTMLProps = {
  html: string;
};

const RawHTML: FC<RawHTMLProps> = ({ html }) => {
  return (
    <pre
      className={"bg-secondary dark:bg-secondary/25 whitespace-pre-wrap rounded-xl px-8 py-4 text-sm"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

type CodeBlockProps = {
  title: string;
  value: string;
};
const CodeBlock: FC<CodeBlockProps> = ({ title, value }) => {
  function syntaxHighlight(json: string) {
    const nJson = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return nJson.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      function (match) {
        let cls = "number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key";
          } else {
            cls = "string";
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean";
        } else if (/null/.test(match)) {
          cls = "null";
        }
        return '<span class="' + cls + '">' + match + "</span>";
      },
    );
  }

  const syntaxHighlightedHTML = syntaxHighlight(value);

  return (
    <div className={"mb-4 text-wrap"}>
      <h1 className={"mb-2 text-xl"}>{title}</h1>
      <RawHTML html={syntaxHighlightedHTML} />
    </div>
  );
};

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
      <CodeBlock title={"Input"} value={JSON.stringify(log.input || {}, undefined, 2)} />
      <CodeBlock title={"Output"} value={JSON.stringify(log.output || {}, undefined, 2)} />
      <CodeBlock title={"Extra"} value={JSON.stringify(log.extra || {}, undefined, 2)} />
    </div>
  );
};
