"use client";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";
import { CustomNavbarItem } from "./CustomNavbarItem";
import { useIsDark } from "../../app/projects/hook/useIsDark";

type Props = {
  icon: React.ReactNode;
  path: string;
  exact?: boolean;
};

export function CustomNavbarLinkItem({ icon, path, exact }: Props) {
  const pathname = usePathname();

  const isExact = exact ? pathname === path : pathname.startsWith(path);

  const router = useRouter();

  const isDark = useIsDark();

  return (
    <CustomNavbarItem>
      <button
        className={twMerge(
          clsx(
            "rounded w-14 h-14 flex justify-center items-center font-bold",
            isExact ? (isDark ? "bg-zinc-700" : "bg-zinc-200") : ""
          )
        )}
        onClick={() => router.push(path)}
      >
        {typeof icon === "string" ? <span>{icon}</span> : icon}
      </button>
    </CustomNavbarItem>
  );
}
