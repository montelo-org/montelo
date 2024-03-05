import { Theme, useTheme } from "remix-themes";
import { authenticatedLoader } from "../../common/auth/authenticated.loader";
import { SignUp } from "@clerk/remix";
import { dark } from "@clerk/themes";
import { Routes } from "../../routes";

export const loader = authenticatedLoader;

export default function RegisterRoute() {
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  return <SignUp
    signInUrl={Routes.auth.login}
    redirectUrl={Routes.app.root}
    appearance={{
      baseTheme: isDarkMode ? dark : undefined,
    }}
  />;
}
