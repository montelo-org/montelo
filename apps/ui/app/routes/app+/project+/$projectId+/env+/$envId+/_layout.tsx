import { Outlet, useMatches } from "@remix-run/react";
import { Sidebar } from "~/components/nav/sidebar/Sidebar";
import { Routes } from "~/routes";
import { AppLayoutLoader } from "~/routes/app+/_layout";

export default function DashboardLayout() {
  const matches = useMatches();

  const rootLayoutData = matches.find((match) => match.pathname === Routes.app.root)?.data as AppLayoutLoader;

  return (
    <div className="h-full">
      <Sidebar project={rootLayoutData.project!} />
      <main className="ml-44 mt-2 flex-1 px-8 pb-4">
        <Outlet />
      </main>
    </div>
  );
}
