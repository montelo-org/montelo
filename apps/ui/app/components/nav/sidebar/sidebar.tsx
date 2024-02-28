import { Link, useLoaderData, useLocation, useParams } from "@remix-run/react";
import { BookOpen, FlaskConical, GanttChart, Hammer, HelpCircle, Home, LayoutDashboard, Rocket } from "lucide-react";
import { Routes } from "../../../routes";
import { EnvLayoutLoader } from "../../../types/envLayout.loader.types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { ComponentProps, FC } from "react";
import { EnvSelector } from "../header/EnvSelector";
import { ProfileDropdown } from "../header/ProfileDropdown";

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

type BottomSidebarItem = {
  name: string;
  icon: JSX.Element;
  href: string;
};

const SidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: Routes.app.project.env.dashboard,
    icon: ({ className }) => <LayoutDashboard size={16} className={className} />,
  },
  {
    name: "Traces & Logs",
    href: Routes.app.project.env.traces,
    icon: ({ className }) => <GanttChart size={16} className={className} />,
  },
  {
    name: "Prompts & Tools",
    disabled: true,
    icon: ({ className }) => <Hammer size={16} className={className} />,
  },
  {
    name: "Experiments",
    disabled: true,
    icon: ({ className }) => <FlaskConical size={16} className={className} />,
  },
  {
    name: "Deployments",
    disabled: true,
    icon: ({ className }) => <Rocket size={16} className={className} />,
  },
];

const BottomSidebarItems: BottomSidebarItem[] = [
  {
    name: "Docs",
    href: Routes.external.documentation,
    icon: <BookOpen size={16} className={"group-hover:text-foreground text-muted-foreground"} />,
  },
  {
    name: "Help",
    href: Routes.external.discord,
    icon: <HelpCircle size={16} className={"group-hover:text-foreground text-muted-foreground"} />,
  },
];

export const Sidebar = () => {
  const { user, project, environment } = useLoaderData<EnvLayoutLoader>();
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

  const BottomItemsComponent = () => BottomSidebarItems.map((item) => (
    <li key={item.name} className={"group hover:bg-muted/50 rounded"}>
      <Link
        to={item.href}
        target={"_blank"}
        prefetch={"intent"}
        className={"flex items-center py-1"}
      >
        <div className="flex justify-center w-8">{item.icon}</div>
        <span className="ml-1 whitespace-nowrap text-muted-foreground">{item.name}</span>
      </Link>
    </li>
  ));

  return (
    <aside className="w-52 h-screen fixed left-0 top-0 flex flex-col border-r-[1px]" aria-label="Sidebar">
      <div className={"flex flex-col p-4 gap-4 mb-2"}>
        <div className="flex flex-row items-center justify-between">
          <div className={"flex flex-row items-center"}>
            <Link
              to={Routes.app.root}
              prefetch={"intent"}
              className={"group flex items-center py-1 hover:bg-muted/50 rounded"}
            >
              <div className="flex justify-center w-8">
                <Home size={16} className={"group-hover:text-foreground text-muted-foreground"} />
              </div>
            </Link>
            <p className={"text-sm text-muted-foreground"}>/ {project.team.name}</p>
          </div>
          <ProfileDropdown user={user} />
        </div>
        <div className={"flex flex-col gap-1"}>
          <p className={"text-sm text-muted-foreground"}>{project.name}</p>
          <EnvSelector environments={project.environments} pathEnv={environment} />
        </div>
      </div>
      <div className="overflow-y-auto flex-grow pl-4 pr-4 pb-4">
        <ul className="space-y-1">
          <SidebarItemsComponent />
        </ul>
      </div>
      <div className="mt-auto p-4">
        <ul className="space-y-1">
          <BottomItemsComponent />
        </ul>
      </div>
    </aside>
  );
};
