import { EnvironmentDto, FullProjectDto } from "@montelo/browser-client";
import { FC } from "react";
import { OrgSwitcher } from "~/components/nav/header/OrgSwitcher";
import { ProfileDropdown } from "~/components/nav/header/ProfileDropdown";
import { ProjectEnvSelector } from "./ProjectEnvSelector";
import { ThemeSwitcher } from "./ThemeSwitcher";

type HeaderProps = {
  project?: FullProjectDto;
  environment?: EnvironmentDto;
  allProjects?: FullProjectDto[];
  hideOrgSwitcher?: boolean;
};
export const Header: FC<HeaderProps> = ({ project, environment, allProjects, hideOrgSwitcher }) => {
  const shouldRenderProjectEnvSelector = !!(project && environment && allProjects);

  return (
    <div className={"flex flex-1 flex-row items-center justify-between"}>
      <div className={"flex flex-row items-center gap-1"}>
        {!hideOrgSwitcher && <OrgSwitcher />}
        {shouldRenderProjectEnvSelector && (
          <ProjectEnvSelector projects={allProjects} selectedProject={project} selectedEnvironment={environment} />
        )}
      </div>
      <div>
        <div className={"flex flex-row items-center gap-4"}>
          <ThemeSwitcher size={24} />
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};
