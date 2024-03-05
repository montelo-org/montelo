import { Theme, useTheme } from "remix-themes";
import { authenticatedLoader } from "../../common/auth/authenticated.loader";
import { SignIn } from "@clerk/remix";
import { dark } from "@clerk/themes";
import { Routes } from "../../routes";

export const loader = authenticatedLoader;

export default function LoginRoute() {
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  return <SignIn
    signUpUrl={Routes.auth.register}
    redirectUrl={Routes.app.root}
    appearance={{
      baseTheme: isDarkMode ? dark : undefined,
    }}
  />;
}