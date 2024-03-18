import { FC } from "react";
import { ProfileDropdown } from "~/components/nav/header/ProfileDropdown";
import { AppLayoutLoader } from "~/types/AppLayoutLoader.types";
import { HeaderBreadcrumb } from "./HeaderBreadcrumb";

export const Header: FC<AppLayoutLoader> = (props) => {
  return (
    <div className={"flex flex-1 flex-row items-center justify-between"}>
      <HeaderBreadcrumb {...props} />
      <ProfileDropdown />
    </div>
  );
};
