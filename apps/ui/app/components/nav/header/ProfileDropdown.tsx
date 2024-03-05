import { Theme, useTheme } from "remix-themes";
import { UserButton, useUser } from "@clerk/remix";
import { dark } from "@clerk/themes";
import { Skeleton } from "../../ui/skeleton";
import { useDebounceValue } from "../../../hooks/useDebounceValue";

export const ProfileDropdown = () => {
  const { isLoaded } = useUser();
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;
  const [debouncedIsLoaded] = useDebounceValue<boolean>(isLoaded, 350);

  return (
    debouncedIsLoaded ?
      <UserButton
        appearance={{
          baseTheme: isDarkMode ? dark : undefined,
        }}
        userProfileProps={{
          appearance: {
            baseTheme: isDarkMode ? dark : undefined,
          },
        }}
      /> : <Skeleton className="h-8 w-8 rounded-full" />
  );
};