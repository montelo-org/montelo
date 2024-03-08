import { SignUp } from "@clerk/remix";
import { dark } from "@clerk/themes";
import { authenticatedLoader } from "~/auth/authenticated.loader";
import { Routes } from "~/routes";

export const loader = authenticatedLoader;

export default function RegisterRoute() {
  return (
    <SignUp
      signInUrl={Routes.auth.login}
      redirectUrl={Routes.app.root}
      appearance={{
        baseTheme: dark,
      }}
    />
  );
}
