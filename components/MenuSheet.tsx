"use client";

import { useEffect, useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { AlignJustify, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

const MenuSheet = () => {
  const { t, i18n } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/home";
  const textColorClass = isHomePage ? "text-white" : "text-inherit";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    Cookies.set("language", lang);
    window.location.reload();
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <AlignJustify size={24} className={cn(textColorClass)} />
      </SheetTrigger>
      <SheetContent
        side="top"
        className="size-full"
        aria-describedby="menu-sheet"
      >
        <SheetHeader className="flex flex-col gap-5 pt-10 text-start">
          <SheetTitle className="text-2xl font-extrabold md:text-3xl">
            {t("menuSheet.title")}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {t("menuSheet.description")}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">{t("menuSheet.language")}</h3>
          <div className="mt-2 flex flex-col gap-2">
            <button
              className={cn(
                i18n.language === "ar" ? "text-orange-500" : "",
                "flex items-center gap-3 p-2",
              )}
              onClick={() => handleLanguageChange("ar")}
            >
              <div className="size-5">
                {i18n.language === "ar" && (
                  <Check className="text-orange-500" size={20} />
                )}
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/icons/egy_icon.svg"
                  alt="Arabic"
                  width={20}
                  height={20}
                />
                Ar
              </div>
            </button>
            <hr />
            <button
              className={cn(
                i18n.language === "en" ? "text-orange-500" : "",
                "flex items-center gap-3 p-2",
              )}
              onClick={() => handleLanguageChange("en")}
            >
              <div className="size-5">
                {i18n.language === "en" && (
                  <Check className="text-orange-500" size={20} />
                )}
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/icons/usa_icon.svg"
                  alt="English"
                  width={20}
                  height={20}
                />{" "}
                En
              </div>
            </button>
          </div>
        </div>

        <div className="my-4 h-3 w-full bg-[#d9d9d9]" />

        <div className="mt-6">
          <h3 className="text-lg font-semibold">{t("menuSheet.theme")}</h3>
          <div className="mt-2 flex flex-col gap-2">
            <button
              className={cn(
                resolvedTheme === "light" ? "text-orange-500" : "",
                "flex items-center gap-3 p-2",
              )}
              onClick={() => handleThemeChange("light")}
            >
              <div className="size-5">
                {resolvedTheme === "light" && (
                  <Check className="text-orange-500" size={20} />
                )}
              </div>
              <div className="flex items-center gap-3">
                <IoMdSunny className="text-orange-500" size={20} />{" "}
                {t("menuSheet.light")}
              </div>
            </button>
            <hr />
            <button
              className={cn(
                resolvedTheme === "dark" ? "text-orange-500" : "",
                "flex items-center gap-3 p-2",
              )}
              onClick={() => handleThemeChange("dark")}
            >
              <div className="size-5">
                {resolvedTheme === "dark" && (
                  <Check className="text-orange-500" size={20} />
                )}
              </div>
              <div className="flex items-center gap-3">
                <IoMdMoon className="text-[#464646]" size={20} />{" "}
                {t("menuSheet.dark")}
              </div>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
