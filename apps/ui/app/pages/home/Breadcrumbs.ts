import { Home } from "lucide-react";

import { Routes } from "../../routes";
import { Breadcrumb } from "./HomeLayout";

export const OrgBreadcrumb: Breadcrumb = {
  name: "Organizations",
  link: Routes.app.root,
  icon: Home,
};

export const OrgIdBreadcrumb: (id: string, name: string) => Breadcrumb = (id, name) => ({
  name,
  link: Routes.app.org.projects(id),
});
