import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";
import { env } from "../config/environment.server";

const isProduction = env.NODE_ENV === "production";

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.SECRET!],
    ...(isProduction ? { domain: "app.montelo.ai", secure: true } : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(themeStorage);
