import { AnalyticsControllerGetForDashboardDateSelectionEnum, LogDto } from "@montelo/browser-client";
import { Await, Link, useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import { AlertCircle, CircleSlash, DollarSign, GanttChart, Timer } from "lucide-react";
import numbro from "numbro";
import { FC, Suspense } from "react";
import { Area, AreaChart, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Routes } from "~/routes";
import { DashboardLoader } from "~/types/DashboardLoader.types";
import { idShortener } from "../traces/utils";
import { AnalyticsCard } from "./cards/AnalyticsCard";
import { BaseContent, BaseContentSkeleton } from "./cards/BaseContent";

export const DashboardPage = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { analytics, logs, costHistory } = useLoaderData<DashboardLoader>();

  const selectedValue =
    searchParams.get("dateSelection") || AnalyticsControllerGetForDashboardDateSelectionEnum._30Mins;

  const RecentLog: FC<{ log: LogDto }> = ({ log }) => {
    const { short: shortTraceId, variant } = idShortener(log.traceId);
    const { short: shortLogId } = idShortener(log.id);

    return (
      <TableRow>
        <TableCell>{dayjs(log.startTime || log.createdAt).format("h:mm:ssa")}</TableCell>
        <TableCell>
          <Link
            to={Routes.app.project.env.traceId({
              projectId: params.projectId!,
              envId: params.envId!,
              traceId: log.traceId,
              logId: log.id,
            })}
          >
            <Badge variant={variant}>
              {shortTraceId} / {shortLogId}
            </Badge>
          </Link>
        </TableCell>
        <TableCell>{log.name}</TableCell>
        <TableCell>{log.duration ? `${log.duration}s` : "—"}</TableCell>
        <TableCell>{log.totalCost ? `$${log.totalCost}` : "—"}</TableCell>
      </TableRow>
    );
  };

  const formatXDates = (tickItem: string): string => {
    const date = dayjs(tickItem);
    const formatMap: Record<AnalyticsControllerGetForDashboardDateSelectionEnum, string> = {
      [AnalyticsControllerGetForDashboardDateSelectionEnum._30Mins]: date.format("h:mm"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum._1Hr]: date.format("h:mm"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum._24Hrs]: date.format("h:mm"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum._7Days]: date.format("MMM D"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum._1Month]: date.format("MMM D"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum._3Months]: date.format("MMM D"),
      [AnalyticsControllerGetForDashboardDateSelectionEnum.AllTime]: date.format("MMM YYYY"),
    };
    return formatMap[selectedValue as AnalyticsControllerGetForDashboardDateSelectionEnum];
  };

  return (
    <div className={"flex flex-col pt-0.5"}>
      <div className={"mb-4 flex justify-end"}>
        <Select
          value={selectedValue}
          onValueChange={(value) => {
            setSearchParams((prev) => {
              prev.set("dateSelection", value);
              return prev;
            });
          }}
        > 
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum._30Mins}>30 mins</SelectItem>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum._1Hr}>1 hr</SelectItem>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum._24Hrs}>24 hrs</SelectItem>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum._7Days}>7 days</SelectItem>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum._1Month}>1 month</SelectItem>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum._3Months}>3 months</SelectItem>
              <SelectItem value={AnalyticsControllerGetForDashboardDateSelectionEnum.AllTime}>All time</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

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
        <AnalyticsCard title={"Prompts & Tools"} icon={AlertCircle}>
          <Suspense fallback={<BaseContentSkeleton />}>
            <Await resolve={analytics}>{(analytics) => <BaseContent title={"Coming soon"} />}</Await>
          </Suspense>
        </AnalyticsCard>
      </div>

      <div className={"mt-8 grid grid-cols-5 gap-8"}>
        {/*Recent Logs Section*/}
        <div className="col-span-2">
          <h1 className={"mb-4 text-2xl font-medium"}>Recent Logs</h1>
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
                  return (
                    <div className={"flex h-full items-center justify-center rounded-lg border"}>
                      <Alert className={"flex w-1/3 flex-row items-center justify-start gap-4 p-4"}>
                        <div>
                          <CircleSlash size={20} />
                        </div>
                        <div className={"flex flex-col"}>
                          <AlertTitle>No Data</AlertTitle>
                          <AlertDescription>Try another date filter.</AlertDescription>
                        </div>
                      </Alert>
                    </div>
                  );
                }

                return (
                  <ResponsiveContainer>
                    <AreaChart data={costHistory.costHistory}>
                      <defs>
                        <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                          <stop offset="90%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="intervalStart"
                        type={"category"}
                        tickFormatter={formatXDates}
                        stroke={"hsl(var(--border))"}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        stroke={"hsl(var(--border))"}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          borderRadius: "8px",
                          borderColor: "hsl(var(--border))",
                        }}
                        formatter={(value) => [`$${value}`, "Total Cost"]}
                        labelFormatter={(date) => dayjs(date).format("MMM D YYYY H:mm:ss")}
                        cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 2 }}
                      />
                      <Area
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="totalCost"
                        dot={false}
                        legendType={"none"}
                        strokeWidth={3}
                        stroke={"hsl(var(--primary))"}
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
  );
};
