import { withAuth } from "~/auth/withAuth";
import { OnboardingPage } from "~/pages/onboarding/OnboardingPage";
import { clerkClient } from "~/services/clerk.server";

export const loader = withAuth(async ({ userId }) => {
  // Update the user's metadata to indicate that they have completed onboarding
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      hasOnboarded: true,
    },
  });

  return {};
});

export default function OnboardingRoute() {
  return <OnboardingPage />;
}
