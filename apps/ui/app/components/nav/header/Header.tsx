import { OrganizationSwitcher, UserButton } from "@clerk/remix";
import { dark } from "@clerk/themes";
import { Theme, useTheme } from "remix-themes";
import { Routes } from "../../../routes";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { EnvironmentDto, FullProjectDto } from "@montelo/browser-client";
import { FC } from "react";
import { EnvSelector } from "./EnvSelector";

type HeaderProps = {
  project?: FullProjectDto;
  environment?: EnvironmentDto;
  hideOrgSwitcher?: boolean;
}
export const Header: FC<HeaderProps> = ({ project, environment, hideOrgSwitcher }) => {
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  const shouldRenderProjectSelector = !!project;
  const shouldRenderEnvSelector = !!(project && environment);

  return (
    <div className={"flex flex-row justify-between items-center align-middle"}>
      <div className={"flex flex-row gap-4 items-center align-middle"}>
        {!hideOrgSwitcher && <OrganizationSwitcher
          hidePersonal={true}
          afterLeaveOrganizationUrl={Routes.app.root}
          afterCreateOrganizationUrl={Routes.app.project.all}
          afterSelectOrganizationUrl={Routes.app.project.all}
          appearance={{
            baseTheme: isDarkMode ? dark : undefined,
          }}
          organizationProfileProps={{
            appearance: {
              baseTheme: isDarkMode ? dark : undefined,
            },
          }}
        />}
        {shouldRenderProjectSelector && <p>Project</p>}
        {shouldRenderEnvSelector && <EnvSelector environments={project.environments} pathEnv={environment} />}
      </div>
      <div>
        <div className={"flex flex-row gap-4 items-center align-middle"}>
          <ThemeSwitcher size={24} />
          <UserButton
            afterSignOutUrl={Routes.auth.login}
            signInUrl={Routes.auth.register}
            appearance={{
              baseTheme: isDarkMode ? dark : undefined,
            }}
            userProfileProps={{
              appearance: {
                baseTheme: isDarkMode ? dark : undefined,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};