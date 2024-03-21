import { Outlet, useMatches } from "@remix-run/react";
import { Sidebar } from "~/components/nav/sidebar/Sidebar";
import { Routes } from "~/routes";
import { AppLayoutLoader } from "~/types/AppLayoutLoader.types";

export default function DashboardLayout() {
  const matches = useMatches();

  const rootLayoutData = matches.find((match) => match.pathname === Routes.app.root)?.data as AppLayoutLoader;

  return (
    <div className="h-full">
      <Sidebar project={rootLayoutData.project!} />
      <main className="ml-44 flex-1 pb-4 pl-8 pr-4">
        <Outlet />
      </main>
    </div>
  );
}
