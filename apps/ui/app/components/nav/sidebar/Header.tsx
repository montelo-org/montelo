import { CreateOrganization, OrganizationProfile, useOrganizationList } from "@clerk/remix";
import { Organization, OrganizationMembership } from "@clerk/remix/api.server";
import { dark } from "@clerk/themes";
import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate } from "@remix-run/react";
import { ArrowRightLeft, Building, PanelLeftClose, Settings } from "lucide-react";
import { FC, useState } from "react";
import { Theme, useTheme } from "remix-themes";
import { ClerkDialogContent } from "~/components/ClerkDialogContent";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Routes } from "~/routes";

type HeaderProps = {
  org: Organization;
  orgMemberships: OrganizationMembership[];
  closeSidebar: () => void;
};
export const Header: FC<HeaderProps> = ({ org, orgMemberships, closeSidebar }) => {
  const { isLoaded, setActive } = useOrganizationList();
  const navigate = useNavigate();
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  const filteredMemberships = orgMemberships.filter((membership) => membership.organization.id !== org.id);

  const [dialogContent, setDialogContent] = useState<"create" | "profile" | null>(null);

  const openCreateOrg = () => setDialogContent("create");
  const openOrgProfile = () => setDialogContent("profile");
  const closeDialog = () => setDialogContent(null);

  return (
    <div className={"flex h-8 w-full items-center justify-between"}>
      <div>
        <Dialog.Root onOpenChange={(isOpen) => !isOpen && closeDialog()}>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={
                "hover:bg-muted flex items-center rounded-xl px-3 py-2 focus:outline-none dark:hover:bg-[#151218]"
              }
            >
              <Avatar className="ml-[2px] h-6 w-6">
                <AvatarImage src={org.imageUrl} />
                <AvatarFallback>{org.name[0]}</AvatarFallback>
              </Avatar>

              <span className="text-muted-foreground ml-2.5 text-sm">{org.name}</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60">
              <DropdownMenuLabel>Organizations</DropdownMenuLabel>
              <DropdownMenuGroup>
                {filteredMemberships.map((membership) => {
                  const [swapIconVisible, setSwapIconVisible] = useState<boolean>(false);

                  const showSwapIcon = () => {
                    setSwapIconVisible(true);
                  };

                  const hideSwapIcon = () => {
                    setSwapIconVisible(false);
                  };

                  const handleClick = () => {
                    if (!isLoaded) {
                      return;
                    }
                    const beforeEmit = () => navigate(Routes.app.root);
                    setActive({ organization: membership.organization.id, beforeEmit });
                  };

                  return (
                    <DropdownMenuItem
                      key={membership.id}
                      onMouseEnter={showSwapIcon}
                      onMouseLeave={hideSwapIcon}
                      asChild
                      onClick={handleClick}
                      className={"cursor-pointer"}
                    >
                      <div className={"flex justify-between"}>
                        <div className={"flex gap-2"}>
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={membership.organization.imageUrl} />
                            <AvatarFallback>{membership.organization.name[0]}</AvatarFallback>
                          </Avatar>
                          {membership.organization.name}
                        </div>
                        {swapIconVisible && <ArrowRightLeft size={16} />}
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <Dialog.Trigger asChild onClick={openOrgProfile}>
                <DropdownMenuItem>
                  <Settings size={16} />
                  &nbsp; {org.name} Settings
                </DropdownMenuItem>
              </Dialog.Trigger>
              <Dialog.Trigger asChild onClick={openCreateOrg}>
                <DropdownMenuItem>
                  <Building size={16} />
                  &nbsp; Create Organization
                </DropdownMenuItem>
              </Dialog.Trigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <ClerkDialogContent>
            {dialogContent === "create" && (
              <CreateOrganization
                afterCreateOrganizationUrl={Routes.app.root}
                appearance={{ baseTheme: isDarkMode ? dark : undefined }}
              />
            )}
            {dialogContent === "profile" && (
              <OrganizationProfile appearance={{ baseTheme: isDarkMode ? dark : undefined }} />
            )}
          </ClerkDialogContent>
        </Dialog.Root>
      </div>

      <button className="opacity-40 hover:opacity-70" onClick={closeSidebar}>
        <PanelLeftClose size={18} />
      </button>
    </div>
  );
};
