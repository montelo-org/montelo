import { Outlet } from "@remix-run/react";

export default function AppLayout() {
  return (
    <div className="h-screen w-screen px-4 pt-4 pb-1">
      <Outlet />
    </div>
  );
}
