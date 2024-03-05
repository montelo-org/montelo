import React from "react";
import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
        <Outlet />
    </div>
  );
}
