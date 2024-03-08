import { OrganizationSwitcher, useOrganization } from "@clerk/remix";
import { dark } from "@clerk/themes";
import { Theme, useTheme } from "remix-themes";
import { Skeleton } from "~/components/ui/skeleton";
import { useDebounceValue } from "~/hooks/useDebounceValue";
import { Routes } from "~/routes";

export const OrgSwitcher = () => {
  const { isLoaded } = useOrganization();
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;
  const [debouncedIsLoaded] = useDebounceValue<boolean>(isLoaded, 350);

  return debouncedIsLoaded ? (
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
  ) : (
    <Skeleton className={"h-10 w-48"} />
  );
};
