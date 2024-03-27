import { useClerk } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { Theme, useTheme } from "remix-themes";
import { Routes } from "~/routes";

type LoaderData = {
  orgId?: string;
  projectId?: string;
  envId?: string;
};

export const loader: LoaderFunction = async (args) => {
  const auth = await getAuth(args);
  const token = await auth.getToken();
  if (!token || !auth.userId) {
    return redirect(Routes.auth.login);
  }
  return json<LoaderData>({});
};

export default function RootRoute() {
  const navigate = useNavigate();
  const clerk = useClerk();
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;
  const userMetadata = clerk.loaded ? clerk.user?.publicMetadata : null;

  useEffect(() => {
    if (userMetadata) {
      const { hasOnboarded, personalProjectId, personalEnvId } = userMetadata;
      const redirectPath = hasOnboarded ? Routes.app.project.env.dashboard : Routes.app.project.env.onboarding;

      navigate(
        redirectPath({
          projectId: personalProjectId as string,
          envId: personalEnvId as string,
        }),
        {
          unstable_viewTransition: true,
        },
      );
    }
  }, [userMetadata]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <img src={isDarkMode ? "/DarkModeLogo.svg" : "/LightModeLogo.svg"} alt={"Montelo Logo"} className={"w-48"} />
    </div>
  );
}
