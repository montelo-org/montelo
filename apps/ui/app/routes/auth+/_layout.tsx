import { Link, Outlet } from "@remix-run/react";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Theme, useTheme } from "remix-themes";
import { useMount } from "~/hooks";
import { Routes } from "~/routes";

export default function AuthLayout() {
  const [theme, setTheme] = useTheme();

  const setDarkModeTheme = () => {
    if (theme === Theme.LIGHT) {
      setTheme(Theme.DARK);
    }
  };
  useMount(setDarkModeTheme);

  return (
    <div>
      <Link
        to={Routes.external.landing}
        className="text-muted-foreground hover:text-primary-foreground absolute left-0 top-0 flex items-center gap-2 p-4 text-sm"
      >
        <ArrowLeft size={14} /> Back to Montelo
      </Link>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
        <Outlet />
      </div>
    </div>
  );
}
