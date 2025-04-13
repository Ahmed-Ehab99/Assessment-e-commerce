"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const SecHeading = dynamic(() => import("@/components/SecHeading"), {
  ssr: false,
});
const FeatuersCard = dynamic(() => import("@/components/FeatuersCard"), {
  ssr: false,
});

const FeaturesSec = () => {
  const { t } = useTranslation();
  const features = useMemo(
    () =>
      t("home.features.card", { returnObjects: true }) as Array<{
        title: string;
        subTitle: string;
      }>,
    [t],
  );

  return (
    <section className="bg-[#FFF9F1] dark:bg-[#221506]">
      <div className="container mx-auto px-6 py-32">
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <span className="text-xl font-normal capitalize text-[#E58411]">
            {t("home.features.subTitle")}
          </span>
          <SecHeading text={t("home.features.title")} />
        </div>
        <div className="relative z-10 mt-20 grid grid-cols-1 items-center justify-center gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatuersCard
              key={index}
              className={`${index === 0 ? "rotate-y-180 bg-feature1" : index === 1 ? "bg-feature2" : "bg-feature3"}`}
              title={feature.title}
              subTitle={feature.subTitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSec;
