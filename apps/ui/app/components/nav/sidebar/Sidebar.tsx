import { Link, useLocation, useParams } from "@remix-run/react";
import { BookOpen, FlaskConical, GanttChart, Hammer, HelpCircle, LayoutDashboard, Rocket } from "lucide-react";
import { Routes } from "../../../routes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { ComponentProps, FC } from "react";
import { ApiKeysDialog } from "./ApiKeysDialog";
import { FullProjectDto } from "@montelo/browser-client";

type ClassName = ComponentProps<"div">["className"];

type BaseSidebarItem = {
  name: string;
  icon: FC<{ className: ClassName }>;
}

type DisabledItem = BaseSidebarItem & {
  disabled: true
}

type LinkItem = BaseSidebarItem & {
  href: (params: any) => string;
}

type SidebarItem = DisabledItem | LinkItem;

const SidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: Routes.app.project.env.dashboard,
    icon: ({ className }) => <LayoutDashboard size={20} className={className} />,
  },
  {
    name: "Traces & Logs",
    href: Routes.app.project.env.traces,
    icon: ({ className }) => <GanttChart size={20} className={className} />,
  },
  {
    name: "Prompts & Tools",
    disabled: true,
    icon: ({ className }) => <Hammer size={20} className={className} />,
  },
  {
    name: "Experiments",
    disabled: true,
    icon: ({ className }) => <FlaskConical size={20} className={className} />,
  },
  {
    name: "Deployments",
    disabled: true,
    icon: ({ className }) => <Rocket size={20} className={className} />,
  },
];

type SidebarProps = {
  project: FullProjectDto;
}

export const Sidebar: FC<SidebarProps> = ({ project }) => {
  const { pathname } = useLocation();
  const params = useParams();
  const envId = params.envId!;

  const SidebarItemsComponent = () => SidebarItems.map((item) => {
    const params = {
      envId,
      projectId: project.id,
    };

    if ("disabled" in item) {
      return (
        <TooltipProvider delayDuration={0} key={item.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <li key={item.name}
                  className="flex items-center py-1 cursor-not-allowed">
                <div className="flex justify-center w-8">
                  {<item.icon className={"text-muted-foreground/50"} />}
                </div>
                <span className="ml-1 whitespace-nowrap text-muted-foreground/50">{item.name}</span>
              </li>
            </TooltipTrigger>
            <TooltipContent side={"right"} sideOffset={-10} align={"start"}>
              <p>Coming Soon</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    const isActive = pathname.startsWith(item.href(params));
    return (
      <li key={item.name} className={`${isActive ? "bg-muted/50" : ""} group hover:bg-muted/50 rounded`}>
        <Link
          to={item.href(params)}
          prefetch={"intent"}
          className={"flex items-center py-1"}
        >
          <div className={"flex justify-center w-8"}>
            {<item.icon className={"group-hover:text-foreground text-muted-foreground"} />}
          </div>
          <span className="ml-1 whitespace-nowrap text-muted-foreground">{item.name}</span>
        </Link>
      </li>
    );
  });

  return (
    <aside className="mt-4 w-48 flex flex-col h-full fixed top-16 left-0 bottom-0" aria-label="Sidebar">
      <div className="overflow-y-auto flex-grow pl-4 pr-4 pb-4">
        <ul className="space-y-1">
          <SidebarItemsComponent />
          <ApiKeysDialog projectId={project.id} />
        </ul>
      </div>
      <div className="flex flex-row justify-between p-4">
        <div className={"group hover:bg-muted/50 rounded"}>
          <Link to={Routes.external.slack} target={"_blank"}>
            <HelpCircle size={20} className={"group-hover:text-foreground text-muted-foreground"} />
          </Link>
        </div>
        <div className={"group hover:bg-muted/50 rounded"}>
          <Link to={Routes.external.documentation} target={"_blank"}>
            <BookOpen size={20} className={"group-hover:text-foreground text-muted-foreground"} />
          </Link>
        </div>
      </div>
    </aside>
  );
};
