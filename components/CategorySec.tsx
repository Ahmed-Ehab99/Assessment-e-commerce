"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { CategoriesApiResponse } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import dynamic from "next/dynamic";

const CategoriesCard = dynamic(() => import("@/components/CategoriesCard"), {
  ssr: false,
});
const SecHeading = dynamic(() => import("@/components/SecHeading"), {
  ssr: false,
});

const CategorySec = React.memo(() => {
  const { t, i18n } = useTranslation();
  const lang = useMemo(() => i18n.language, [i18n.language]);
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories", lang],
    queryFn: useCallback(async () => {
      try {
        const authToken = Cookies.get("authToken");
        const response = await axios.get<CategoriesApiResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/category/get`,
          {
            headers: {
              "Accept-Language": lang,
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
        if (response.data.isSuccessful && response.data.data) {
          return response.data.data;
        }
        throw new Error(
          response.data.message || "Could not retrieve categories.",
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    }, [lang]),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const categoriesGrid = useMemo(() => {
    if (isLoading) return <CategoriesCardSkeleton />;
    if (isError)
      return (
        <Alert variant="destructive" className="col-span-full">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "An error occurred while loading categories."}
          </AlertDescription>
        </Alert>
      );
    return (
      categories &&
      categories.length > 0 &&
      categories.map((category) => (
        <CategoriesCard key={category.id} category={category} />
      ))
    );
  }, [[categories, isLoading, isError, error]]);

  return (
    <section
      aria-labelledby="categories-heading"
      className="container mx-auto flex flex-col gap-7 px-6 py-32 lg:gap-12 xl:flex-row"
    >
      <SecHeading id="categories-heading" text={t("home.categories.title")} />
      <div className="grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {categoriesGrid}
      </div>
    </section>
  );
});

export default CategorySec;

const CategoriesCardSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex flex-col gap-5">
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-8 w-3/4 rounded" />
          <Skeleton className="h-16 w-full rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      ))}
    </>
  );
};
