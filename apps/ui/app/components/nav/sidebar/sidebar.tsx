import { Link, useLoaderData, useLocation, useParams } from "@remix-run/react";
import {
  BookOpenText,
  FlaskConical,
  GanttChart,
  Hammer,
  HeartHandshake,
  Home,
  LayoutDashboard,
  Rocket,
} from "lucide-react";
import { Routes } from "../../../routes";
import { EnvLayoutLoader } from "../../../types/envLayout.loader.types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

type BaseSidebarItem = {
  name: string;
  icon: JSX.Element;
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
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Traces & Logs",
    href: Routes.app.project.env.traces,
    icon: <GanttChart size={20} />,
  },
  {
    name: "Prompts & Tools",
    disabled: true,
    icon: <Hammer size={20} />,
  },
  {
    name: "Experiments",
    disabled: true,
    icon: <FlaskConical size={20} />,
  },
  {
    name: "Deployments",
    disabled: true,
    icon: <Rocket size={20} />,
  },
];

const BottomSidebarItems = [
  {
    name: "Documentation",
    href: Routes.external.documentation,
    icon: <BookOpenText size={20} />,
  },
  {
    name: "Support",
    href: Routes.external.support,
    icon: <HeartHandshake size={20} />,
  },
];

export const Sidebar = () => {
  const { project } = useLoaderData<EnvLayoutLoader>();
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
                  className="flex items-center py-2 px-4 rounded-lg text-muted-foreground cursor-not-allowed">
                <div className="flex justify-center w-8">
                  {item.icon}
                </div>
                <span className="ml-2 whitespace-nowrap">{item.name}</span>
              </li>
            </TooltipTrigger>
            <TooltipContent side={"right"} sideOffset={-40} align={"start"}>
              <p>Coming Soon</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    const isActive = pathname.startsWith(item.href(params));
    return (
      <li key={item.name}>
        <Link
          to={item.href(params)}
          prefetch={"intent"}
          className={`flex items-center py-2 px-4 rounded-lg hover:underline underline-offset-2 ${isActive ? "underline" : ""}`}
        >
          <div className="flex justify-center w-8">
            {item.icon}
          </div>
          <span className="ml-2 whitespace-nowrap">{item.name}</span>
        </Link>
      </li>
    );
  });

  const BottomItemsComponent = () => BottomSidebarItems.map((item) => (
    <li key={item.name}>
      <Link
        to={item.href}
        target={"_blank"}
        prefetch={"intent"}
        className={`flex items-center py-2 px-4 rounded-lg hover:underline underline-offset-2 ${
          pathname === item.href ? "underline" : ""
        }`}
      >
        <div className="flex justify-center w-8">{item.icon}</div>
        <span className="ml-2 whitespace-nowrap">{item.name}</span>
      </Link>
    </li>
  ));

  return (
    <aside className="w-52 h-screen fixed left-0 top-0 flex flex-col" aria-label="Sidebar">
      <div className="flex flex-row items-center py-6 px-4 gap-2">
        <img className="h-8 w-auto" src={"/logo.png"} alt="Logo" />
        <p className={"text-xl"}>MonteloAI</p>
      </div>
      <div className="overflow-y-auto flex-grow">
        <ul className="space-y-2">
          <SidebarItemsComponent />
        </ul>
      </div>
      <div className="mt-auto">
        <ul className="space-y-2 mb-8">
          <BottomItemsComponent />
        </ul>
        <div className={"flex-row items-center mb-4"}>
          <div className={"px-4"}>
            <p className={"text-sm text-muted-foreground font-light my-1"}>Project: {project.name}</p>
            <p className={"text-sm text-muted-foreground font-light my-1"}>Team: {project.team.name}</p>
          </div>
          <Link
            to={Routes.app.root}
            prefetch={"intent"}
            className={"flex items-center py-2 px-4 rounded-lg hover:underline underline-offset-2"}
          >
            <div className="flex justify-center w-8">
              <Home size={20} />
            </div>
            <span className="ml-2 whitespace-nowrap">Home</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
