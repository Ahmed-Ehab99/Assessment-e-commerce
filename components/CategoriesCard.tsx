"use client";

import { CategoryData } from "@/types";
import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const CategoriesCard = React.memo(
  ({ category }: { category: CategoryData }) => {
    const { t, i18n } = useTranslation();

    return (
      <div className="flex flex-col gap-5 text-[#1e1e1e] dark:text-white">
        <Image
          loading="lazy"
          alt={category.title}
          src={`${process.env.NEXT_PUBLIC_API_URL}/${category.image}`}
          width={200}
          height={200}
          className="h-64 w-full rounded-3xl object-cover"
        />

        <h3 className="text-2xl font-extrabold opacity-90">{category.title}</h3>

        <p className="line-clamp-3 text-base font-light opacity-80">
          {category.description}
        </p>

        <div className="flex w-full">
          <a
            href={`/shop/${category.id}`}
            className="flex w-fit flex-row gap-5"
          >
            <span className="text-sm font-normal text-[#E58411]">
              {t("home.moreInfo")}
            </span>
            {i18n.language === "ar" ? (
              <MoveLeft color="#E58411" />
            ) : (
              <MoveRight color="#E58411" />
            )}
          </a>
        </div>
      </div>
    );
  },
);

CategoriesCard.displayName = "CategoriesCard";

export default CategoriesCard;
