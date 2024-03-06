import { Outlet, useMatches } from "@remix-run/react";
import { Sidebar } from "~/components/nav/sidebar/Sidebar";
import { Routes } from "~/routes";
import { AppLayoutLoader } from "~/routes/app+/_layout";

export default function DashboardLayout() {
  const matches = useMatches();

  const rootLayoutData = matches.find((match) => match.pathname === Routes.app.root)?.data as AppLayoutLoader;

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar project={rootLayoutData.project!} />
      <main className="flex-1 overflow-y-auto pb-4 px-8 mt-4 ml-44">
        <Outlet />
      </main>
    </div>
  );
};