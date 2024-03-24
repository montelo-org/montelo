import { User } from "@clerk/remix/api.server";
import { FullProjectDto } from "@montelo/browser-client";
import { Link, useLocation, useParams } from "@remix-run/react";
import { BookOpen, Database, FlaskConical, GanttChart, HelpCircle, LayoutDashboard } from "lucide-react";
import { ComponentProps, FC } from "react";
import { Routes } from "~/routes";
import { ApiKeysDialog } from "./ApiKeysDialog";
import { ProfileDropdown } from "./ProfileDropdown";

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
    icon: ({ className }) => <LayoutDashboard className={className} />,
  },
  {
    name: "Traces",
    href: Routes.app.project.env.traces,
    icon: ({ className }) => <GanttChart className={className} />,
  },
  {
    name: "Datasets",
    href: Routes.app.project.env.datasets,
    icon: ({ className }) => <Database className={className} />,
  },
  {
    name: "Experiments",
    href: Routes.app.project.env.experiments,
    icon: ({ className }) => <FlaskConical className={className} />,
  },
];

type SidebarLinkProps = {
  name: string;
  href: (params: any) => string;
  Icon: FC<{ className: ClassName }>;
  params: any;
};
const SidebarLink = ({ name, href, Icon, params }: SidebarLinkProps) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(href(params));

  const activeWrapperStyle = isActive ? "bg-muted font-medium" : "hover:bg-muted dark:hover:bg-[#151218]";
  const activeIconStyle = isActive ? "text-primary" : "text-muted-foreground";
  const activeSpanStyle = isActive ? "text-primary" : "text-muted-foreground";

  return (
    <Link
      to={href(params)}
      prefetch={"intent"}
      className={`flex items-center rounded-xl px-2.5 py-2 ${activeWrapperStyle}`}
    >
      <div className={"flex w-8 justify-center"}>
        <Icon className={`h-4 w-4 ${activeIconStyle}`} />
      </div>
      <span className={`ml-1.5 whitespace-nowrap text-sm ${activeSpanStyle}`}>{name}</span>
    </Link>
  );
};

type SidebarProps = {
  project: FullProjectDto;
  user: User;
};
export const Sidebar: FC<SidebarProps> = ({ project, user }) => {
  const { envId } = useParams();
  const params = { envId, projectId: project.id };

  const SidebarLinks = () =>
    SidebarItems.map((item) => (
      <SidebarLink key={item.name} name={item.name} href={item.href} Icon={item.icon} params={params} />
    ));

  return (
    <aside className="flex h-full flex-col justify-between">
      <ul className="flex flex-col gap-1">
        <SidebarLinks />
        <ApiKeysDialog projectId={project.id} />
      </ul>

      <div className="flex flex-col gap-1 pb-2">
        <SidebarLink name={"Support"} href={() => Routes.external.discord} Icon={HelpCircle} params={params} />
        <SidebarLink
          name={"Documentation"}
          href={() => Routes.external.documentation}
          Icon={BookOpen}
          params={params}
        />
        <ProfileDropdown user={user} />
      </div>
    </aside>
  );
};
