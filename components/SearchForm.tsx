"use client";

import { cn } from "@/lib/utils";
import Form from "next/form";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const SearchForm = ({ className }: { className?: string }) => {
  const { t, i18n } = useTranslation();

  return (
    <Form
      aria-label="Search Form"
      action="/shop"
      className={cn(
        "relative mt-2 w-full sm:mt-0 sm:w-auto sm:flex-1",
        className,
      )}
    >
      <label htmlFor="search" className="sr-only">
        {t("header.search")}
      </label>

      <input
        name="query"
        type="text"
        placeholder={t("header.search")}
        className="w-full max-w-md rounded-3xl bg-[#fdfdfd] py-3 pe-9 ps-5 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 dark:focus:ring-0"
      />

      <Image
        src="/icons/light_search.svg"
        alt="Search Icon"
        width={20}
        height={20}
        className={cn(
          i18n.language === "ar"
            ? "left-2 top-1/2 -translate-y-1/2"
            : "right-2 top-1/2 -translate-y-1/2",
          "absolute top-1/2 -translate-y-1/2",
        )}
      />
    </Form>
  );
};

export default SearchForm;
