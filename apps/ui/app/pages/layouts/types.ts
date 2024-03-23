import { FC, ReactNode } from "react";


export type LayoutBreadcrumb = {
  label: string;
  to?: string;
};

export type PageLayoutProps = {
  breadcrumbs: LayoutBreadcrumb[];
  subtitle?: FC;
  action?: FC;
  children: ReactNode;
};