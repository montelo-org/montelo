import { useClerk, useUser } from "@clerk/remix";
import { Link, useNavigate } from "@remix-run/react";
import { Check, LogOut, Palette, UserRound } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
} from "~/components/ui/dropdown-menu";
import { Routes } from "~/routes";

export const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { isLoaded, user } = useUser();
  const [theme, setTheme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  const userInitials =
    isLoaded && user ? `${user.firstName?.charAt(0).toUpperCase()}${user.lastName?.charAt(0).toUpperCase()}` : "";
  const userFullName = isLoaded && user ? user.fullName : "";
  const userEmail = isLoaded && user ? user.primaryEmailAddress?.emailAddress : "";

  const handleLogout = () => {
    signOut(() => navigate(Routes.auth.login));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={"hover:bg-muted flex items-center rounded-xl px-3 py-2 focus:outline-none dark:hover:bg-[#151218]"}
      >
        <Avatar className="ml-[2px] h-6 w-6">
          {isLoaded && user?.hasImage && <AvatarImage src={user.imageUrl} />}
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>

        {user?.fullName && <span className="text-muted-foreground ml-2.5 text-sm">{user.fullName}</span>}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className={"pb-0"}>{userFullName}</DropdownMenuLabel>
        <DropdownMenuLabel className={"text-muted-foreground pt-0 text-sm font-light"}>{userEmail}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={Routes.app.account}>
              <UserRound size={20} />
              &nbsp; Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette size={20} />
                &nbsp; Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
                    {isDarkMode && (
                      <>
                        <Check size={20} />
                        &nbsp;
                      </>
                    )}
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
                    {!isDarkMode && (
                      <>
                        <Check size={20} />
                        &nbsp;
                      </>
                    )}
                    Light
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut size={20} />
          &nbsp; Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
