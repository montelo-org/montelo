import { OrganizationList, useOrganizationList } from "@clerk/remix";
import { Theme, useTheme } from "remix-themes";
import { dark } from "@clerk/themes";
import { Routes } from "../../routes";
import { HomeLayout } from "./HomeLayout";
import { OrgBreadcrumb } from "./Breadcrumbs";
import { useDebounceValue } from "../../hooks/useDebounceValue";
import { Skeleton } from "../../components/ui/skeleton";

export const HomePage = () => {
  const { isLoaded } = useOrganizationList();
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;
  const [debouncedIsLoaded] = useDebounceValue<boolean>(isLoaded, 350);

  return (
    <HomeLayout breadcrumbs={[OrgBreadcrumb]}>
      {debouncedIsLoaded ? <OrganizationList
        hidePersonal={true}
        afterCreateOrganizationUrl={org => Routes.app.org.projects}
        afterSelectOrganizationUrl={org => Routes.app.org.projects}
        appearance={{
          baseTheme: isDarkMode ? dark : undefined,
        }}
      /> : <Skeleton className="w-[25rem] h-96 rounded-xl" />}
    </HomeLayout>
  );
};