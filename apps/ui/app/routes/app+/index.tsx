import { OrganizationList } from "@clerk/remix";
import { dark } from "@clerk/themes";
import { Theme, useTheme } from "remix-themes";
import { Routes } from "~/routes";

export default function RootRoute() {
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  return (
    <div className={"flex w-full h-full justify-center"}>
      <OrganizationList
        hidePersonal={true}
        afterCreateOrganizationUrl={() => Routes.app.project.all}
        afterSelectOrganizationUrl={() => Routes.app.project.all}
        appearance={{
          baseTheme: isDarkMode ? dark : undefined,
          elements: {
            formFieldLabelRow__slug: {
              display: "none",
            },
            formFieldInput__slug: {
              display: "none",
            },
          },
        }}
      />
    </div>
  );
}
