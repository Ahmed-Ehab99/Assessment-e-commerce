"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import ProductsSec from "./ProductsSec";
import { cn } from "@/lib/utils";
import { getCategoryById } from "@/lib/getDataById";
import { useCallback, useMemo } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CategoryDetail = ({ id }: { id: string }) => {
  const { t, i18n } = useTranslation();
  const lang = useMemo(() => i18n.language, [i18n.language]);

  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category", id, lang],
    queryFn: useCallback(() => getCategoryById(id, lang), [id, lang]),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const categoryBanner = useMemo(() => {
    if (isLoading) return <CategoryDetailSkeleton />;
    if (isError)
      return (
        <Alert variant="destructive" className="col-span-full">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "An error occurred while loading category."}
          </AlertDescription>
        </Alert>
      );
    return (
      category && (
        <div className="flex flex-col justify-between gap-16 md:flex-row">
          <div className="flex w-full flex-col gap-10 md:w-1/2 md:gap-0">
            <Breadcrumb className="text-[#E58411]">
              <BreadcrumbList className="text-[#E58411]">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="hover:text-[#e58611af]"
                    href="/home"
                  >
                    {t("header.home")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  className={cn(i18n.language === "ar" ? "rotate-180" : "")}
                />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#E58411]">
                    {category.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex h-full flex-col justify-center gap-10">
              <h2 className="text-4xl font-extrabold lg:text-6xl">
                {category.title}
              </h2>
              <p className="text-xl font-normal text-[#262626] opacity-80 dark:text-white md:text-sm lg:text-base">
                {category.description}
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-[#FAFAFA] p-5 dark:bg-[#221506] md:size-80 lg:size-[27rem]">
            <Image
              loading="eager"
              priority
              src={`${process.env.NEXT_PUBLIC_API_URL}/${category.image}`}
              alt={category.title}
              width={500}
              height={500}
              className="size-full rounded-2xl object-cover"
            />
          </div>
        </div>
      )
    );
  }, [category, isLoading, isError, error, t, i18n.language]);

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 pb-20 pt-24 md:pt-40">
        {categoryBanner}

        {category && <ProductsSec categoryID={category?.id} />}
      </div>

      <Image
        src="/shapes/shape6.svg"
        alt="Shape"
        width={300}
        height={300}
        className="absolute left-0 top-72 -z-20 h-auto w-auto opacity-0 md:opacity-100"
        loading="eager"
        priority
      />

      <Image
        src="/shapes/shape7.svg"
        alt="Shape"
        width={300}
        height={300}
        className="absolute -bottom-96 left-0 -z-10 h-auto w-auto opacity-0 md:opacity-100"
        loading="eager"
        priority
      />

      <Image
        src="/shapes/shape8.svg"
        alt="Shape"
        width={300}
        height={300}
        className="absolute -bottom-96 -right-20 -z-10 h-auto w-auto opacity-0 md:opacity-100"
        loading="eager"
        priority
      />
    </section>
  );
};

export default CategoryDetail;

const CategoryDetailSkeleton = () => {
  return (
    <>
      <div className="mb-32 flex flex-col justify-between gap-16 md:flex-row">
        <div className="flex w-full flex-col gap-10 md:w-1/2 md:gap-0">
          <Skeleton className="h-6 w-40" />
          <div className="flex h-full flex-col justify-center gap-10">
            <Skeleton className="h-16 w-96" />
            <Skeleton className="h-28 w-full" />
          </div>
        </div>
        <Skeleton className="size-[27rem] rounded-2xl" />
      </div>
      <Skeleton className="h-screen w-full" />
    </>
  );
};
