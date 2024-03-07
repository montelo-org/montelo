import React from "react";
import { Outlet } from "@remix-run/react";
import { Theme, useTheme } from "remix-themes";
import { useMount } from "../../hooks";

export default function AuthLayout() {
  const [theme, setTheme] = useTheme();

  const setDarkModeTheme = () => {
    if (theme === Theme.LIGHT) {
      setTheme(Theme.DARK);
    }
  };
  useMount(setDarkModeTheme);

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-screen">
      <img className="fixed top-12 h-10" src={"/DarkModeLogo.svg"} alt="Logo" />
      <Outlet />
    </div>
  );
}
