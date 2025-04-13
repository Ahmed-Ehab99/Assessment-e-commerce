"use client";

import FooterCol from "./FooterCol";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#F7F7F7] dark:bg-[#221506]">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="flex flex-col justify-between py-20 md:flex-row md:items-center">
          <div className="mb-10 flex flex-col gap-10 md:mb-0 md:w-1/3">
            <span className="text-3xl font-bold">{t("footer.logo")}</span>

            <p className="text-base text-[#1e1e1e] opacity-80 dark:text-white">
              {t("footer.text")}
            </p>
          </div>
          <div className="flex flex-row flex-wrap gap-20 lg:gap-28">
            <FooterCol
              title={t("footer.links.services.title")}
              links={[
                {
                  label: t("footer.links.services.items.emailMarketing"),
                  href: "/",
                },
                {
                  label: t("footer.links.services.items.campaigns"),
                  href: "/",
                },
                { label: t("footer.links.services.items.branding"), href: "/" },
              ]}
            />

            <FooterCol
              title={t("footer.links.furniture.title")}
              links={[
                { label: t("footer.links.furniture.items.beds"), href: "/" },
                { label: t("footer.links.furniture.items.chair"), href: "/" },
                { label: t("footer.links.furniture.items.all"), href: "/" },
              ]}
            />

            <FooterCol
              title={t("footer.links.followUs.title")}
              links={[
                { label: t("footer.links.followUs.items.facebook"), href: "/" },
                { label: t("footer.links.followUs.items.twitter"), href: "/" },
                {
                  label: t("footer.links.followUs.items.instagram"),
                  href: "/",
                },
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-5 pb-10 md:flex-row">
          <span className="text-sm font-normal text-[#1E2833] opacity-50 dark:text-white md:text-base">
            {t("footer.copyright")} {new Date().getFullYear()}
          </span>

          <div className="flex flex-row justify-between gap-12">
            <span className="text-sm font-normal text-[#1e1e1e] opacity-80 dark:text-white md:text-base">
              {t("footer.terms")}
            </span>

            <span className="text-sm font-normal text-[#1e1e1e] opacity-80 dark:text-white md:text-base">
              {t("footer.privacy")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
