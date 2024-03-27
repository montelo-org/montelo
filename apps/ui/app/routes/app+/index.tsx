import { useClerk, useOrganizationList } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
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
  const { isLoaded, setActive } = useOrganizationList();
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [navigationData, setNavigationData] = useState<{
    projectId: string;
    envId: string;
    orgId: string;
  } | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [ellipsisCount, setEllipsisCount] = useState(0);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const memberships = await clerk.getOrganizationMemberships();
        if (!memberships) {
          return;
        }

        const personalOrgMembership = memberships.find(
          (membership) => membership.publicUserData?.userId === clerk.user?.id,
        );

        if (personalOrgMembership) {
          const { defaultProjectId, defaultEnvId } = personalOrgMembership.organization.publicMetadata as Record<
            string,
            string
          >;

          if (defaultProjectId && defaultEnvId) {
            setIsNavigationReady(true);
            setNavigationData({
              projectId: defaultProjectId,
              envId: defaultEnvId,
              orgId: personalOrgMembership.organization.id,
            });
          }
        }

        // If the required data is not found, wait for 250ms and fetch again
        await new Promise((resolve) => setTimeout(resolve, 250));
        await fetchMemberships();
      } catch (error) {
        console.error("Error fetching memberships:", error);
      }
    };

    void fetchMemberships();
  }, [clerk.loaded]);

  useEffect(() => {
    if (isLoaded && isNavigationReady && navigationData) {
      // Continue the ellipsis animation for 1.5 seconds
      setTimeout(() => {
        setIsNavigating(true);

        // Wait for 0.75 seconds before navigating
        setTimeout(() => {
          const hasOnboarded = clerk.user?.publicMetadata?.hasOnboarded;
          const redirectPath = hasOnboarded ? Routes.app.project.env.dashboard : Routes.app.project.env.onboarding;

          const beforeEmit = () =>
            navigate(
              redirectPath({
                projectId: navigationData.projectId,
                envId: navigationData.envId,
              }),
              {
                unstable_viewTransition: true,
              },
            );

          setActive({ organization: navigationData.orgId, beforeEmit });
        }, 500);
      }, 1500);
    }
  }, [isNavigationReady, navigationData, navigate, isLoaded]);

  useEffect(() => {
    const ellipsisInterval = setInterval(() => {
      setEllipsisCount((prevCount) => (prevCount + 1) % 4);
    }, 550);

    return () => {
      clearInterval(ellipsisInterval);
    };
  }, []);

  const getEllipsis = () => {
    return ".".repeat(ellipsisCount);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <img src={"/DarkModeLogo.svg"} alt={"Montelo Logo"} className={"w-48"} />
      {isNavigating ? (
        <p className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          You&apos;re{" "}
          <span
            className={
              "text-primary dark:text-primary-foreground decoration-primary font-bold underline decoration-4 underline-offset-4"
            }
          >
            ready.
          </span>
        </p>
      ) : (
        <p className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          Setting up Montelo <span>{getEllipsis()}</span>
        </p>
      )}
    </div>
  );
}
