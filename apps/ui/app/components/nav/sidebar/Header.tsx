import { CreateOrganization, OrganizationProfile, useOrganizationList } from "@clerk/remix";
import { Organization, OrganizationMembership } from "@clerk/remix/api.server";
import { dark } from "@clerk/themes";
import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate, useRevalidator } from "@remix-run/react";
import { ArrowRightLeft, PanelLeftClose, Plus, Settings } from "lucide-react";
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

const PersonalAccountImage =
  "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZEhoM2VnU1R2UTRpbzdOR3V3c2RkNTVnR3MiLCJyaWQiOiJ1c2VyXzJlSFZjQ2E0eE1yekwyMmRQaVF0SXlGWkJ2TiIsImluaXRpYWxzIjoiU00ifQ?width=160";

type MembershipOptionProps = {
  name: string;
  imageUrl: string;
  onClick: () => void;
};
const MembershipOption: FC<MembershipOptionProps> = ({ name, imageUrl, onClick }) => {
  const [swapIconVisible, setSwapIconVisible] = useState<boolean>(false);
  const showSwapIcon = () => setSwapIconVisible(true);
  const hideSwapIcon = () => setSwapIconVisible(false);

  return (
    <DropdownMenuItem
      key={name}
      onMouseEnter={showSwapIcon}
      onMouseLeave={hideSwapIcon}
      asChild
      onClick={onClick}
      className={"cursor-pointer p-2"}
    >
      <div className={"flex justify-between"}>
        <div className={"flex items-center gap-2"}>
          <Avatar className="h-6 w-6">
            <AvatarImage src={imageUrl} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          {name}
        </div>
        {swapIconVisible && <ArrowRightLeft size={16} />}
      </div>
    </DropdownMenuItem>
  );
};

type HeaderProps = {
  org?: Organization;
  orgMemberships: OrganizationMembership[];
  closeSidebar: () => void;
};
export const Header: FC<HeaderProps> = ({ org, orgMemberships, closeSidebar }) => {
  const { isLoaded, setActive } = useOrganizationList();
  const navigate = useNavigate();
  const [theme] = useTheme();
  const isDarkMode = theme === Theme.DARK;
  const revalidator = useRevalidator();

  const isPersonal = !org;
  const filteredMemberships = isPersonal
    ? orgMemberships
    : orgMemberships.filter((membership) => membership.organization.id !== org.id);

  const [dialogContent, setDialogContent] = useState<"create" | "profile" | null>(null);

  const openCreateOrg = () => setDialogContent("create");
  const openOrgProfile = () => setDialogContent("profile");
  const closeDialog = () => {
    setDialogContent(null);
    revalidator.revalidate();
  };
  const onSelectOrganization = (organizationId: string | null) => {
    if (!isLoaded) return;

    const beforeEmit = () => navigate(Routes.app.root);
    setActive({ organization: organizationId, beforeEmit });
  };

  return (
    <div className={"flex h-8 w-full items-center justify-between"}>
      <div>
        <Dialog.Root onOpenChange={(isOpen) => !isOpen && closeDialog()}>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={
                "hover:bg-muted flex w-44 items-center rounded-xl px-3 py-[6px] focus:outline-none dark:hover:bg-[#151218]"
              }
            >
              <Avatar className="ml-[2px] h-6 w-6">
                <AvatarImage src={isPersonal ? PersonalAccountImage : org.imageUrl} />
                <AvatarFallback>{isPersonal ? "P" : org.name[0]}</AvatarFallback>
              </Avatar>

              <span className="text-muted-foreground ml-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                {org?.name || "Personal Account"}
              </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60">
              <DropdownMenuLabel className="flex justify-between py-3">
                {isPersonal ? "Personal Account" : org?.name}
              </DropdownMenuLabel>

              <DropdownMenuGroup>
                {orgMemberships.length > 0 && <DropdownMenuSeparator />}
                {!isPersonal && (
                  <MembershipOption
                    name={"Personal Account"}
                    imageUrl={PersonalAccountImage}
                    onClick={() => onSelectOrganization(null)}
                  />
                )}
                {filteredMemberships.map((membership) => (
                  <MembershipOption
                    key={membership.id}
                    name={membership.organization.name}
                    imageUrl={membership.organization.imageUrl}
                    onClick={() => onSelectOrganization(membership.organization.id)}
                  />
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              {!isPersonal && (
                <Dialog.Trigger asChild onClick={openOrgProfile}>
                  <DropdownMenuItem className="cursor-pointer p-2">
                    <div className="w-4">
                      <Settings size={16} />
                    </div>
                    &nbsp; Manage Organization
                  </DropdownMenuItem>
                </Dialog.Trigger>
              )}
              <Dialog.Trigger asChild onClick={openCreateOrg}>
                <DropdownMenuItem className="cursor-pointer p-2">
                  <div className="w-4">
                    <Plus size={16} />
                  </div>
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
