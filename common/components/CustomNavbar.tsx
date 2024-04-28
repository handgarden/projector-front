"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { AuthButton } from "./AuthButton";
import { ProfileButton } from "./ProfileButton";

export default function CustomNavbar() {
  return (
    <Navbar isBordered>
      <NavbarContent>
        <NavbarBrand className="gap-2">
          <a href="/">
            <h1 className="text-xl font-bold">Projector</h1>
          </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <ProfileButton />
        </NavbarItem>
        <NavbarItem>
          <AuthButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
