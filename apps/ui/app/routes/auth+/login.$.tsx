import { SignIn } from "@clerk/remix";
import { dark } from "@clerk/themes";
import { authenticatedLoader } from "../../auth/authenticated.loader";
import { Routes } from "../../routes";

export const loader = authenticatedLoader;

export default function LoginRoute() {
  return (
    <SignIn
      signUpUrl={Routes.auth.register}
      redirectUrl={Routes.app.root}
      appearance={{
        baseTheme: dark,
      }}
    />
  );
}
