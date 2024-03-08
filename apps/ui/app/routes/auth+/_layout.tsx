import { Outlet } from "@remix-run/react";
import React from "react";
import { Theme, useTheme } from "remix-themes";
import { useMount } from "~/hooks";

export default function AuthLayout() {
  const [theme, setTheme] = useTheme();

  const setDarkModeTheme = () => {
    if (theme === Theme.LIGHT) {
      setTheme(Theme.DARK);
    }
  };
  useMount(setDarkModeTheme);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <img className="fixed top-12 h-10" src={"/DarkModeLogo.svg"} alt="Logo" />
      <Outlet />
    </div>
  );
}
