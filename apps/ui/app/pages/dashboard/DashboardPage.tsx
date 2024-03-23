import { AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum } from "@montelo/browser-client";
import { Await, useLoaderData, useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import { DollarSign, FlaskConical, GanttChart, Timer } from "lucide-react";
import numbro from "numbro";
import { FC, Suspense } from "react";
import { Area, AreaChart, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { DateSelector } from "~/pages/dashboard/DateSelector";
import { PageLayout } from "~/pages/layouts/PageLayout";
import { LayoutBreadcrumb } from "~/pages/layouts/types";
import { DashboardLoader } from "~/types/DashboardLoader.types";
import { PageSubtitle } from "../layouts/PageSubtitle";
import { NoData } from "./NoData";
import { RecentLog } from "./RecentLog";
import { AnalyticsCard } from "./cards/AnalyticsCard";
import { BaseContent, BaseContentSkeleton } from "./cards/BaseContent";

export const DashboardPage: FC = () => {
  const { analytics, logs, costHistory } = useLoaderData<DashboardLoader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedValue =
    searchParams.get("dateSelection") || AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._30Mins;

  const formatXDates = (tickItem: string): string => {
    const date = dayjs(tickItem);
    const formatMap: Record<AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum, string> = {
      [AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._30Mins]: date.format("h:mm"),
      [AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._1Hr]: date.format("h:mm"),
      [AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._24Hrs]: date.format("h:mm"),
      [AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._7Days]: date.format("MMM D"),
      [AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._1Month]: date.format("MMM D"),
      [AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum._3Months]: date.format("MMM D"),
      [AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum.AllTime]: date.format("MMM YYYY"),
    };
    return formatMap[selectedValue as AnalyticsControllerGetAnalyticsForEnvDateSelectionEnum];
  };

  const breadcrumbs: LayoutBreadcrumb[] = [
    {
      label: "Dashboard",
    },
  ];

  const subtitle = () => {
    return <PageSubtitle>High-level overview of your traces and experiments.</PageSubtitle>;
  };

  const action = () => {
    return <DateSelector selectedValue={selectedValue} setSearchParams={setSearchParams} />;
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs} subtitle={subtitle} action={action}>
      <div className={"flex flex-1 flex-col"}>
        {/*Analytics Section*/}
        <div className={"flex flex-grow flex-row gap-8"}>
          <AnalyticsCard title={"Cost"} icon={DollarSign}>
            <Suspense fallback={<BaseContentSkeleton />}>
              <Await resolve={analytics}>
                {(analytics) => (
                  <BaseContent
                    title={`$${numbro(analytics.cost).format({ thousandSeparated: true })}`}
                    content={() => <Badge variant={"orange"}>{`Max $${analytics.max.cost}`}</Badge>}
                    percent={analytics.changes.cost}
                  />
                )}
              </Await>
            </Suspense>
          </AnalyticsCard>
          <AnalyticsCard title={"Latency"} icon={Timer}>
            <Suspense fallback={<BaseContentSkeleton />}>
              <Await resolve={analytics}>
                {(analytics) => (
                  <BaseContent
                    title={`${analytics.averageLatency}s avg`}
                    content={() => <Badge variant={"orange"}>{`Max ${analytics.max.latency}s`}</Badge>}
                    percent={analytics.changes.latency}
                  />
                )}
              </Await>
            </Suspense>
          </AnalyticsCard>
          <AnalyticsCard title={"Traces"} icon={GanttChart}>
            <Suspense fallback={<BaseContentSkeleton />}>
              <Await resolve={analytics}>
                {(analytics) => (
                  <BaseContent
                    title={numbro(analytics.traces).format({
                      thousandSeparated: true,
                    })}
                    percent={analytics.changes.traces}
                  />
                )}
              </Await>
            </Suspense>
          </AnalyticsCard>
          <AnalyticsCard title={"Experiments"} icon={FlaskConical}>
            <Suspense fallback={<BaseContentSkeleton />}>
              <Await resolve={analytics}>{(analytics) => <BaseContent title={`${analytics.experimentCount}`} />}</Await>
            </Suspense>
          </AnalyticsCard>
        </div>

        <div className={"mt-8 grid grid-cols-5 gap-8"}>
          {/*Recent Logs Section*/}
          <div className="col-span-2">
            <h1 className={"mb-4 text-2xl font-medium"}>Recent Logs</h1>
            {logs.length ? (
              <ScrollArea className="h-[32rem] rounded-lg border" type={"scroll"}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead className={"min-w-28"}>Trace / Log </TableHead>
                      <TableHead>Log Name</TableHead>
                      <TableHead>Latency</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <RecentLog key={log.id} log={log} />
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            ) : (
              <NoData />
            )}
          </div>

          {/*Cost History Section*/}
          <div className="col-span-3 h-[32rem]">
            <h1 className={"mb-4 text-2xl font-medium"}>Cost History</h1>

            <Suspense
              fallback={
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[]}></LineChart>
                </ResponsiveContainer>
              }
            >
              <Await resolve={costHistory}>
                {(costHistory) => {
                  if (!costHistory.costHistory.length) {
                    return NoData();
                  }

                  return (
                    <ResponsiveContainer>
                      <AreaChart data={costHistory.costHistory}>
                        <defs>
                          <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                            <stop offset="90%" stopColor="var(--primary)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="intervalStart"
                          type={"category"}
                          tickFormatter={formatXDates}
                          stroke={"var(--border)"}
                          tick={{ fill: "var(--muted-foreground)" }}
                        />
                        <YAxis
                          stroke={"var(--border)"}
                          tick={{ fill: "var(--muted-foreground)" }}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--popover)",
                            borderRadius: "8px",
                            borderColor: "var(--border)",
                          }}
                          formatter={(value) => [`$${value}`, "Total Cost"]}
                          labelFormatter={(date) => dayjs(date).format("MMM D YYYY H:mm:ss")}
                          cursor={{ stroke: "var(--muted-foreground)", strokeWidth: 2 }}
                        />
                        <Area
                          isAnimationActive={false}
                          type="monotone"
                          dataKey="totalCost"
                          dot={false}
                          legendType={"none"}
                          strokeWidth={3}
                          stroke={"var(--primary)"}
                          fill={"url(#area-gradient)"}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  );
                }}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
