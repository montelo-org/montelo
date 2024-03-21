import { UserProfile } from "@clerk/remix";
import { dark } from "@clerk/themes";
import { Theme, useTheme } from "remix-themes";

export default function UserProfilePage() {
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  return (
    <div className={"mt-8 flex justify-center"}>
      <UserProfile
        appearance={{
          baseTheme: isDarkMode ? dark : undefined,
        }}
      />
    </div>
  );
}
