"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import i18n from "@/lib/i18n";

const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const lang = Cookies.get("language") || "en";

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang).then(() => {
        setReady(true);
      });
    } else {
      setReady(true);
    }

    const dir = lang === "ar" ? "rtl" : "ltr";
    document.body.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, []);

  if (!ready) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
