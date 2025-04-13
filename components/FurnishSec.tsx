"use client";

import { useTranslation } from "react-i18next";
import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

const SecHeading = dynamic(() => import("@/components/SecHeading"), {
  ssr: false,
});

const FurnishSec = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="container mx-auto px-6 py-32">
      <div className="flex flex-col justify-between gap-16 lg:flex-row">
        <div className="w-full rounded-3xl bg-[#f7f7f7] p-5 dark:bg-[#221506] lg:w-1/2">
          <Image
            src="/furnish.jpeg"
            alt="Furnish"
            width={1000}
            height={1000}
            loading="lazy"
            className="h-full w-full rounded-3xl object-contain"
          />
        </div>

        <div className="flex w-full flex-col justify-center gap-10 lg:w-1/2">
          <SecHeading text={t("home.furnish.title")} />
          <p className="text-base font-normal text-[#1e1e1e] opacity-80 dark:text-white md:text-xl">
            {t("home.furnish.subTitle")}
          </p>
          <div className="flex w-full">
            <Link href="/shop" className="flex w-fit gap-5">
              <span className="text-sm font-normal text-[#E58411]">
                {t("home.moreInfo")}
              </span>
              {i18n.language === "ar" ? (
                <MoveLeft color="#E58411" />
              ) : (
                <MoveRight color="#E58411" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FurnishSec;
