import { ClerkApp, ClerkErrorBoundary } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { HeadersFunction, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import clsx from "clsx";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import { useRevalidateOnFocus, useRevalidateOnReconnect } from "./hooks";
import { Routes } from "./routes";
import { themeSessionResolver } from "./services/session.server";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => {
  return [{ title: "Montelo" }, { name: "description", content: "Montelo" }];
};

export async function loader(args: LoaderFunctionArgs) {
  return rootAuthLoader(args, async ({ request }) => {
    const { getTheme } = await themeSessionResolver(request);
    return { theme: getTheme() };
  });
}

export const ErrorBoundary = ClerkErrorBoundary();

export function App() {
  const [theme] = useTheme();
  const data = useLoaderData<typeof loader>();

  // revalidation hooks
  useRevalidateOnReconnect();
  useRevalidateOnFocus();

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction={Routes.actions.setTheme}>
      <App />
    </ThemeProvider>
  );
}

export default ClerkApp(AppWithProviders);
