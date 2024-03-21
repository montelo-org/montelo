import { FullProjectDto } from "@montelo/browser-client";
import { Link, useLocation, useParams } from "@remix-run/react";
import { BookOpen, Database, FlaskConical, GanttChart, HelpCircle, LayoutDashboard } from "lucide-react";
import { ComponentProps, FC } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { Routes } from "~/routes";
import { ApiKeysDialog } from "./ApiKeysDialog";

type ClassName = ComponentProps<"div">["className"];

type BaseSidebarItem = {
  name: string;
  icon: FC<{ className: ClassName }>;
};

type LinkItem = BaseSidebarItem & {
  href: (params: any) => string;
};

const SidebarItems: LinkItem[] = [
  {
    name: "Dashboard",
    href: Routes.app.project.env.dashboard,
    icon: ({ className }) => <LayoutDashboard size={20} className={className} />,
  },
  {
    name: "Traces",
    href: Routes.app.project.env.traces,
    icon: ({ className }) => <GanttChart size={20} className={className} />,
  },
  {
    name: "Datasets",
    href: Routes.app.project.env.datasets,
    icon: ({ className }) => <Database size={20} className={className} />,
  },
  {
    name: "Experiments",
    href: Routes.app.project.env.experiments,
    icon: ({ className }) => <FlaskConical size={20} className={className} />,
  },
];

type SidebarProps = {
  project: FullProjectDto;
};

export const Sidebar: FC<SidebarProps> = ({ project }) => {
  const { pathname } = useLocation();
  const params = useParams();
  const envId = params.envId!;

  const SidebarItemsComponent = () =>
    SidebarItems.map((item) => {
      const params = {
        envId,
        projectId: project.id,
      };

      const isActive = pathname.startsWith(item.href(params));
      return (
        <li key={item.name} className={`${isActive ? "bg-muted/50" : ""} hover:bg-muted/50 group rounded`}>
          <Link to={item.href(params)} prefetch={"intent"} className={"flex items-center py-1"}>
            <div className={"flex w-8 justify-center"}>
              {<item.icon className={"group-hover:text-foreground text-muted-foreground"} />}
            </div>
            <span className="text-muted-foreground ml-1 whitespace-nowrap">{item.name}</span>
          </Link>
        </li>
      );
    });

  return (
    <aside className="h-100vh fixed bottom-0 left-0 top-0 flex w-48 flex-col justify-between pt-[80px]">
      <div className="pb-4 pl-4 pr-4">
        <ul className="flex flex-col gap-1 space-y-1">
          <SidebarItemsComponent />
          <ApiKeysDialog projectId={project.id} />
        </ul>
      </div>
      <div className="flex flex-row justify-between p-4">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={"hover:bg-muted/50 group rounded"}>
                <Link to={Routes.external.slack} target={"_blank"}>
                  <HelpCircle size={20} className={"group-hover:text-foreground text-muted-foreground"} />
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Help & Support</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={"hover:bg-muted/50 group rounded"}>
                <Link to={Routes.external.documentation} target={"_blank"}>
                  <BookOpen size={20} className={"group-hover:text-foreground text-muted-foreground"} />
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Documentation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};
