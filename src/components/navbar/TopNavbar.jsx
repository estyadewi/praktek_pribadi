"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { usePathname } from "next/navigation";

export const TopNavbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Artikel", path: "/artikel" },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="py-2 top-0 sticky"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarBrand>
          <div className="flex justify-center items-center">
            <Link
              href="/"
              className="text-lg sm:text-2xl text-center font-bold w-full"
            >
              🩺<span className="text-slate-700">Praktek</span>
              <span className="text-indigo-500"> Pribadi</span>
            </Link>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem
            key={item.path}
            isActive={
              pathname === item.path ||
              (item.path === "/artikel" && pathname.startsWith("/artikel"))
            }
          >
            <Link
              href={item.path}
              className={`${
                pathname === item.path ||
                (item.path === "/artikel" && pathname.startsWith("/artikel"))
                  ? "text-indigo-500 font-bold"
                  : "font-medium"
              }`}
              color={pathname === item.path ? "" : "foreground"}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="sm:hidden">
          <NavbarMenuToggle
            icon={<GiHamburgerMenu className="text-2xl" />}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link href="/masuk">
            <button className="text-indigo-500 border border-indigo-500 hover:bg-indigo-500 hover:text-white px-4 sm:px-6 py-1 sm:py-2 rounded-xl transition-all">
              <span className="text-xs sm:text-sm font-medium">Masuk</span>
            </button>
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link href="/daftar">
            <button className="bg-indigo-500 hover:opacity-80 px-4 sm:px-6 py-1 sm:py-2 rounded-xl">
              <span className="text-xs sm:text-sm font-normal text-white">
                Daftar
              </span>
            </button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        <div className="mt-3"></div>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              href={item.path}
              className={`w-full text-base sm:text-lg ${
                pathname === item.path ||
                (item.path === "/artikel" && pathname.startsWith("/artikel"))
                  ? "text-indigo-500 font-bold"
                  : "text-slate-700 font-medium"
              }`}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
