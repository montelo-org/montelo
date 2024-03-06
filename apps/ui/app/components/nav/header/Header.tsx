import { ThemeSwitcher } from "./ThemeSwitcher";
import { EnvironmentDto, FullProjectDto } from "@montelo/browser-client";
import { FC } from "react";
import { ProjectEnvSelector } from "./ProjectEnvSelector";
import { ProfileDropdown } from "~/components/nav/header/ProfileDropdown";
import { OrgSwitcher } from "~/components/nav/header/OrgSwitcher";

type HeaderProps = {
  project?: FullProjectDto;
  environment?: EnvironmentDto;
  allProjects?: FullProjectDto[];
  hideOrgSwitcher?: boolean;
}
export const Header: FC<HeaderProps> = ({ project, environment, allProjects, hideOrgSwitcher }) => {
  const shouldRenderProjectEnvSelector = !!(project && environment && allProjects);

  return (
    <div className={"flex flex-row justify-between items-center align-middle"}>
      <div className={"flex flex-row gap-4 items-center align-middle"}>
        {!hideOrgSwitcher && <OrgSwitcher />}
        {shouldRenderProjectEnvSelector && <ProjectEnvSelector projects={allProjects} selectedProject={project} selectedEnvironment={environment} />}
      </div>
      <div>
        <div className={"flex flex-row gap-4 items-center align-middle"}>
          <ThemeSwitcher size={24} />
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};
