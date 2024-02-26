import { Theme, useTheme } from "remix-themes";
import { useFetcher } from "@remix-run/react";
import { MouseEventHandler } from "react";
import { Check, LogOut, Palette, UserRound } from "lucide-react";
import { AuthUserDto } from "@montelo/browser-client";
import { Routes } from "../../../routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../../ui/avatar";

type ProfileDropwdownProps = {
  user: AuthUserDto;
}

export const ProfileDropdown = ({ user }: ProfileDropwdownProps) => {
  const [theme, setTheme] = useTheme();
  const fetcher = useFetcher();
  const isDarkMode = theme === Theme.DARK;

  const userInitials = `${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`;
  const userFullName = `${user.firstName} ${user.lastName}`;
  const userEmail = user.email;

  const handleLogOut: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    fetcher.submit(null, {
      method: "POST",
      action: Routes.actions.auth.logout,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"focus:outline-none"}>
        <Avatar>
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className={"pb-0"}>{userFullName}</DropdownMenuLabel>
        <DropdownMenuLabel
          className={"text-sm text-muted-foreground font-light pt-0"}>{userEmail}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/*<DropdownMenuItem>*/}
          {/*  <UserRound size={20} />&nbsp;*/}
          {/*  Profile*/}
          {/*</DropdownMenuItem>*/}
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette size={20} />&nbsp;
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
                    {isDarkMode && <><Check size={20} />&nbsp;</>}
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
                    {!isDarkMode && <><Check size={20} />&nbsp;</>}
                    Light
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          <LogOut size={20} />&nbsp;
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};