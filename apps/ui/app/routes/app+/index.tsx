import { OrganizationList } from "@clerk/remix";
import { Routes } from "../../routes";
import { Theme, useTheme } from "remix-themes";
import { dark } from "@clerk/themes";

export default function RootRoute() {
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  return (
    <div className={"flex justify-center w-full"}>
      <OrganizationList
        hidePersonal={true}
        afterCreateOrganizationUrl={() => Routes.app.project.all}
        afterSelectOrganizationUrl={() => Routes.app.project.all}
        appearance={{
          baseTheme: isDarkMode ? dark : undefined,
          elements: {
            formFieldLabelRow__slug: {
              display: "none"
            },
            formFieldInput__slug: {
              display: "none"
            }
          }
        }}
      />
    </div>
  );
};