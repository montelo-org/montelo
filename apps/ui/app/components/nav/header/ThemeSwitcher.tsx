import { Moon, Sun } from "lucide-react";
import { FC } from "react";
import { Theme, useTheme } from "remix-themes";

type ThemeSwitcherProps = {
  size: number;
}
export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ size }) => {
  const [theme, setTheme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  const handleClick = () => {
    setTheme(isDarkMode ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <div onClick={handleClick} className={"text-muted-foreground cursor-pointer group"}>
      {isDarkMode ? <Moon size={size} className={"group-hover:text-foreground"} /> :
        <Sun size={size} className={"group-hover:text-foreground"} />}
    </div>
  );
};
