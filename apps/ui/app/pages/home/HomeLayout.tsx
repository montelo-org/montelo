import { FC, ReactNode } from "react";
import { Link } from "@remix-run/react";
import { ProfileDropdown } from "../../components/nav/header/ProfileDropdown";
import { ThemeSwitcher } from "../../components/nav/header/ThemeSwitcher";
import { Home, LucideIcon } from "lucide-react";

export type Breadcrumb = {
  name: string;
  link: string;
  icon?: LucideIcon;
}

type HomeLayoutProps = {
  breadcrumbs: Breadcrumb[];
  children: ReactNode;
}

export const HomeLayout: FC<HomeLayoutProps> = ({ breadcrumbs, children }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="mx-32">
        <nav className="mx-auto flex w-full items-center justify-between py-6 pl-4 pr-8" aria-label="Global">
          <div className="flex flex-row items-center p-4 gap-2">
            <img className="h-6 w-auto" src={"/DarkModeLogo.svg"} alt="Logo" />
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end gap-4">
            <div className={"self-center"}>
              <ThemeSwitcher size={24} />
            </div>
            <ProfileDropdown />
          </div>
        </nav>
      </header>
      <main className="flex-1 overflow-x-hidden overflow-y-auto pb-4 px-8 mx-32">
        <div className="flex mb-16">
          {breadcrumbs.map((breadcrumb, index) => (
            <div className="flex items-center" key={index}>
              {breadcrumbs.length - 1 === index ? (
                <div className={"flex items-center"}>
                  {breadcrumb.icon && <breadcrumb.icon className="mr-2" size={32} />}
                  <h1 className="text-4xl font-medium">{breadcrumb.name}</h1>
                </div>
              ) : (
                <Link to={breadcrumb.link} className={"hover:underline flex items-center"}>
                  {index === 0 && breadcrumb.icon && <breadcrumb.icon className="mr-2" size={32} />}
                  <h1 className="text-4xl font-medium">{breadcrumb.name}</h1>
                </Link>
              )}
              {breadcrumbs.length - 1 !== index && (
                <h1 className="text-4xl font-medium mx-2">/</h1>
              )}
            </div>
          ))}
        </div>
        <div className={"flex items-center justify-center w-full"}>
          {children}
        </div>
      </main>
    </div>
  );
};
