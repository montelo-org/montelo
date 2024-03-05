import { Theme, useTheme } from "remix-themes";
import { authenticatedLoader } from "../../common/auth/authenticated.loader";
import { SignIn } from "@clerk/remix";
import { dark } from "@clerk/themes";

export const loader = authenticatedLoader;

export default function LoginRoute() {
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  return <SignIn appearance={{
    baseTheme: isDarkMode ? dark : undefined,
  }} />;
}