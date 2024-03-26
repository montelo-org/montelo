import { RemixBrowser } from "@remix-run/react";
import posthog from "posthog-js";
import { StrictMode, startTransition, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";

function PosthogInit() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      posthog.init("phc_iZ0VLonpOMLBi7z9cljlvKHXODB1udna8oQbtFDlBbQ", {
        api_host: "https://app.posthog.com",
      });
    }
  }, []);

  return null;
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
      <PosthogInit />
    </StrictMode>,
  );
});
