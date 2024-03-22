import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import * as React from "react";
import { FC } from "react";
import { ProfileDropdown } from "~/components/nav/sidebar/ProfileDropdown";
import { Routes } from "~/routes";
import { AppLayoutLoader } from "~/types/AppLayoutLoader.types";

export const Header: FC<AppLayoutLoader> = (props) => {
  return (
    <div className={"flex flex-col gap-2 h-8"}>
      <div className={"flex w-full justify-between"}>
        <div className={"flex flex-row items-center gap-1"}>
          <Link to={Routes.app.project.all}>
            <img src="/LogoIconOnly.svg" alt="Montelo Logo" className={"h-5"} />
          </Link>
          <ChevronRightIcon />
          <Link to={Routes.app.org}>{props.org.name}</Link>
        </div>
        <ProfileDropdown />
      </div>
    </div>
  );
};
