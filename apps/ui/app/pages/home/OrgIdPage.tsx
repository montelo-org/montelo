import { Theme, useTheme } from "remix-themes";
import { HomeLayout } from "./HomeLayout";
import { OrgBreadcrumb, OrgIdBreadcrumb } from "./Breadcrumbs";
import { OrganizationProfile } from "@clerk/remix";
import { dark } from "@clerk/themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Routes } from "../../routes";
import { FullProjectDto } from "@montelo/browser-client";
import { FC } from "react";
import { ProjectCard } from "../../components/cards/ProjectCard";
import { CreateProjectDialog } from "../../components/dialogs/CreateProjectDialog";
import { Organization } from "@clerk/remix/api.server";
import { useNavigate } from "@remix-run/react";
import { TabValues } from "./enums";

type OrgIdPageProps = {
  activeTab: TabValues;
  organization: Organization;
  projects?: FullProjectDto[];
}

export const OrgIdPage: FC<OrgIdPageProps> = ({ activeTab, organization, projects }) => {
  const navigate = useNavigate();
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  const orgId = organization.id;
  const breadcrumbs = [OrgBreadcrumb, OrgIdBreadcrumb(organization.id, organization.name)];

  const handleTabChange = (e: React.MouseEvent<HTMLButtonElement>, value: TabValues) => {
    e.preventDefault();

    const ValueRouteMapping: Record<TabValues, string> = {
      [TabValues.projects]: Routes.app.org.projects,
      [TabValues.settings]: Routes.app.org.settings,
    };

    navigate(ValueRouteMapping[value]);
  };

  const TabComponent = () => {
    return (
      <Tabs value={activeTab} className={"w-3/4"}>
        <TabsList className="grid grid-cols-2 w-2/5 justify-center mb-8 mx-auto">
          <TabsTrigger
            value={TabValues.projects}
            onClick={(e) => handleTabChange(e, TabValues.projects)}
          >
            Projects
          </TabsTrigger>
          <TabsTrigger
            value={TabValues.settings}
            onClick={(e) => handleTabChange(e, TabValues.settings)}
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TabValues.projects}>
          <div className={"flex justify-end mb-4"}>
            <CreateProjectDialog orgId={orgId} />
          </div>
          <div className={"grid grid-cols-2 gap-4"}>
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} orgId={orgId} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value={TabValues.settings}>
          <OrganizationProfile
            afterLeaveOrganizationUrl={Routes.app.root}
            appearance={{
              baseTheme: isDarkMode ? dark : undefined,
            }}
          />
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <TabComponent />
    </HomeLayout>
  );
};
