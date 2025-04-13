"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

const LangButton = () => {
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const isHomePage = pathname === "/home";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    Cookies.set("language", lng);
    window.location.reload();
  };

  return (
    <button
      className="hidden md:block"
      aria-label="Change Language"
      onClick={() =>
        changeLanguage(i18n.language === "en" ? "ar" : "en")
      }
    >
      {i18n.language === "en" ? (
        <div className="flex items-center gap-1">
          <Image
            src="/icons/usa_icon.svg"
            alt="Language Icon"
            width={20}
            height={20}
          />
          <span
            className={cn(
              isHomePage ? "text-white" : "text-black dark:text-white",
              "text-sm font-bold",
            )}
          >
            EN
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <Image
            src="/icons/egy_icon.svg"
            alt="Language Icon"
            width={20}
            height={20}
          />
          <span
            className={cn(
              isHomePage ? "text-white" : "text-black dark:text-white",
              "text-sm font-bold",
            )}
          >
            AR
          </span>
        </div>
      )}
    </button>
  );
};

export default LangButton;
