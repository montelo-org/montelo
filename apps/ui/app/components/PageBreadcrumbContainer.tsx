import { FC, ReactNode } from "react";
import { Breadcrumb, BreadcrumbList } from "~/components/ui/breadcrumb";

export const PageBreadcrumbContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Breadcrumb className={"mb-2"}>
      <BreadcrumbList className={"text-lg"}>{children}</BreadcrumbList>
    </Breadcrumb>
  );
};
