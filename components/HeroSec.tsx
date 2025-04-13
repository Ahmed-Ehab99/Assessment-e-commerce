"use client";

import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const HeroSec = React.memo(() => {
  const { t } = useTranslation();

  return (
    <section className="relative z-10 h-dvh" aria-labelledby="hero-heading">
      <Image
        src="/heroImg.jpeg"
        alt={t("home.hero.title")}
        fill
        loading="eager"
        priority
        quality={100}
        className="-z-10 object-cover object-center"
      />
      <div className="absolute -bottom-1 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <h1 className="mx-5 text-4xl font-extrabold capitalize text-white md:mx-0 md:text-5xl lg:text-6xl xl:text-7xl">
          {t("home.hero.title")}
        </h1>
        <p className="mx-10 mt-10 text-base font-extrabold text-white opacity-80 md:mx-36 md:text-2xl lg:mx-52 xl:mx-80">
          {t("home.hero.subTitle")}
        </p>
      </div>
    </section>
  );
});

export default HeroSec;
