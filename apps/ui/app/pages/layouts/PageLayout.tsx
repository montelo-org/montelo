import { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { PageLayoutProps } from "./types";

export const PageLayout: FC<PageLayoutProps> = ({ breadcrumbs, subtitle: Subtitle, action: Action, children }) => {
  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"flex flex-row items-center justify-between"}>
        <div className={"flex flex-col"}>
          <Breadcrumb>
            <BreadcrumbList className={"text-lg"}>
              {breadcrumbs.map((breadcrumb, index) => (
                <>
                  <BreadcrumbItem key={index}>
                    {breadcrumb.to ? (
                      <BreadcrumbLink href={breadcrumb.to}>{breadcrumb.label}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          {Subtitle && <Subtitle />}
        </div>
        {Action && <Action />}
      </div>
      {children}
    </div>
  );
};
