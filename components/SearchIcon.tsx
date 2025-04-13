"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SearchIcon = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/home";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Image
      src={
        isHomePage
          ? "/icons/dark_search.svg"
          : resolvedTheme === "dark"
          ? "/icons/dark_search.svg"
          : "/icons/light_search.svg"
      }
      alt="Search Icon"
      width={20}
      height={20}
    />
  );
};

export default SearchIcon;
