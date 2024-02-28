import { Theme, useTheme } from "remix-themes";
import { useFetcher } from "@remix-run/react";
import { MouseEventHandler } from "react";
import { Check, LogOut, Palette } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { sha256 } from "js-sha256";

type ProfileDropwdownProps = {
  user: AuthUserDto;
}

export const ProfileDropdown = ({ user }: ProfileDropwdownProps) => {
  const [theme, setTheme] = useTheme();
  const fetcher = useFetcher();
  const isDarkMode = theme === Theme.DARK;

  const userFullName = `${user.firstName} ${user.lastName}`;
  const userEmail = user.email;

  const handleLogOut: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    fetcher.submit(null, {
      method: "POST",
      action: Routes.actions.auth.logout,
    });
  };

  function getGravatarURL(email: string) {
    const address = email.trim().toLowerCase();
    const hash = sha256(address);
    return `https://www.gravatar.com/avatar/${hash}?d=robohash`;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"focus:outline-none"}>
        <Avatar className={"bg-secondary h-6 w-6"}>
          <AvatarImage src={getGravatarURL(user.email)} alt={"User image"} />
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