import { OrganizationSwitcher } from "@clerk/remix";
import { dark } from "@clerk/themes";
import { PanelLeftClose } from "lucide-react";
import { FC } from "react";
import { Theme, useTheme } from "remix-themes";
import { Routes } from "~/routes";
import { AppLayoutLoader } from "~/types/AppLayoutLoader.types";

type HeaderProps = {
  closeSidebar: () => void;
};
export const Header: FC<AppLayoutLoader & HeaderProps> = ({ closeSidebar }) => {
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  return (
    <div className={"flex h-8 w-full items-center justify-between"}>
      <div>
        <OrganizationSwitcher
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
        />
      </div>

      <button className="opacity-40 hover:opacity-70" onClick={closeSidebar}>
        <PanelLeftClose size={18} />
      </button>
    </div>
  );
};
