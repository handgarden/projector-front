"use client";
import { PROJECT_PATH } from "../path/ProjectPath";
import { ROOT_PATH } from "../path/RootPath";
import { CustomNavbarLinkItem } from "./CustomNavbarLinkItem";
import { ProjectorIcon } from "./ProjectorIcon";
import { GoHome } from "react-icons/go";
import { RiSlideshow2Line } from "react-icons/ri";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { CustomNavbarItem } from "./CustomNavbarItem";
import { mclsx } from "../../utils/mclsx";
import { CgProfile } from "react-icons/cg";
import { PROFILE_PATH } from "../path/ProfilePath";
import { useIsDark } from "../../app/projects/hook/useIsDark";

export function CustomNavbar() {
  const isDark = useIsDark();

  return (
    <nav
      className={mclsx(
        "min-w-20 border-r-1 ",
        isDark && "border-r-gray-800",
        !isDark && "border-r-gray-200"
      )}
    >
      <div
        className={mclsx(
          "py-5 border-b-1",
          isDark && "border-b-gray-800",
          !isDark && "border-b-gray-200"
        )}
      >
        <ProjectorIcon />
      </div>
      <ul
        className={mclsx(
          "border-b-1",
          isDark && "border-b-gray-800",
          !isDark && "border-b-gray-200"
        )}
      >
        <CustomNavbarLinkItem exact icon={<GoHome />} path={ROOT_PATH.root} />
        <CustomNavbarLinkItem icon={<CgProfile />} path={PROFILE_PATH.root} />
        <CustomNavbarLinkItem
          icon={<RiSlideshow2Line />}
          path={PROJECT_PATH.root}
        />
      </ul>
      <ul>
        <CustomNavbarItem>
          <ThemeSwitcher />
        </CustomNavbarItem>
      </ul>
    </nav>
  );
}
