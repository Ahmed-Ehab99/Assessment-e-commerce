"use client";

import FormsHeader from "@/components/FormsHeader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const ThanksPage = () => {
  const { i18n } = useTranslation();

  return (
    <section className="relative">
      <div className="container relative mx-auto my-40 max-w-5xl">
        <FormsHeader
          className="text-4xl md:text-5xl"
          title={
            i18n.language === "ar"
              ? "شكرا علي شرائك من متجرنا"
              : "Thank you for your purchase!"
          }
          subTitle={
            i18n.language === "ar"
              ? "نحن نقوم برقصة سعيدة صغيرة هنا"
              : "We're doing a little happy dance over here."
          }
        />
        <div className="flex flex-col items-center justify-center gap-20">
          <Image
            src="/thanks.png"
            alt="Thank You"
            width={1000}
            height={1000}
            className="h-auto w-auto"
            loading="lazy"
          />
          <Button asChild className="h-fit w-52 rounded-3xl">
            <Link href="/home" className="text-xl font-normal">
              {i18n.language === "ar"
                ? "الرجوع إلى الصفحه الرئيسية"
                : "Go to home"}
            </Link>
          </Button>
        </div>
      </div>
      <Image
        src="/shapes/shape11.svg"
        alt="Shape"
        width={300}
        height={300}
        className="absolute bottom-20 left-0 -z-10 h-auto w-auto opacity-0 md:opacity-100"
        loading="eager"
        priority
      />
      <Image
        src="/shapes/shape12.svg"
        alt="Shape"
        width={300}
        height={300}
        className="absolute right-0 top-40 -z-10 h-auto w-auto opacity-0 md:opacity-100"
        loading="eager"
        priority
      />
    </section>
  );
};

export default ThanksPage;
