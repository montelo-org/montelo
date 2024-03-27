import { CreateOrganization, useOrganizationList } from "@clerk/remix";
import { Organization, OrganizationMembership } from "@clerk/remix/api.server";
import { dark } from "@clerk/themes";
import { Link, useNavigate } from "@remix-run/react";
import { ArrowRightLeft, Building, PanelLeftClose, Settings } from "lucide-react";
import { FC, useState } from "react";
import { ClerkDialog } from "~/components/dialogs/ClerkDialog";
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
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { isLoaded, setActive } = useOrganizationList();
  const navigate = useNavigate();

  const filteredMemberships = orgMemberships.filter((membership) => membership.organization.id !== org.id);

  return (
    <div className={"flex h-8 w-full items-center justify-between"}>
      <div>
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
            <DropdownMenuItem asChild>
              <Link to={Routes.app.org}>
                <Settings size={16} />
                &nbsp; {org.name} Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDialogOpen(true)}>
              <Building size={16} />
              &nbsp; Create Organization
            </DropdownMenuItem>
          </DropdownMenuContent>
          <ClerkDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <CreateOrganization
              afterCreateOrganizationUrl={Routes.app.root}
              appearance={{
                baseTheme: dark,
              }}
            />
          </ClerkDialog>
        </DropdownMenu>
      </div>

      <button className="opacity-40 hover:opacity-70" onClick={closeSidebar}>
        <PanelLeftClose size={18} />
      </button>
    </div>
  );
};
