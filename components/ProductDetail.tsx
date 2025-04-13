"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Loader2, Minus, Plus } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import millify from "millify";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { handleAddToCart } from "@/lib/addToCart";
import { getProductById } from "@/lib/getDataById";

const ProductDetail = ({ id }: { id: string }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isArabic = i18n.language === "ar";
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addItem, isAdding, isIncreasing, isDecreasing } = useCart();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", i18n.language],
    queryFn: () => getProductById(id, i18n.language),
  });

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: product?.title,
          text: "Check out this product!",
          url: url,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      navigator.clipboard.writeText(url).then(
        () => {
          toast({
            title: t("toast.copyProductlinkSuccess"),
            variant: "default",
          });
        },
        () => {
          toast({
            title: t("toast.copyProductlinkFailed"),
            variant: "destructive",
          });
        },
      );
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addItemToCart = useCallback(() => {
    handleAddToCart({
      productId: id,
      qty: quantity,
      t,
      router,
      toast,
      addItem,
    });
  }, [id, quantity, t, router, toast, addItem]);

  return (
    <section className="relative">
      <div className="container mx-auto px-6 pb-40 pt-24 md:pt-40">
        {isLoading && <ProductDetailSkeleton />}
        {isError && <div className="text-red-500">Error: {error.message}</div>}
        {product && (
          <>
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
                  className={cn(isArabic ? "rotate-180" : "")}
                />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="hover:text-[#e58611af]"
                    href={`/shop/${product.categories[0].id}`}
                  >
                    {product?.categories[0].title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  className={cn(isArabic ? "rotate-180" : "")}
                />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#E58411]">
                    {product?.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-20 flex flex-col justify-between gap-20 md:flex-row">
              <div className="flex h-fit w-full flex-col justify-center gap-1 md:sticky md:top-6 md:w-1/2">
                {product.productimage.map((image, i) => (
                  <div
                    key={image.id}
                    className={cn(
                      i === 0 ? "w-full" : "w-1/2",
                      "flex justify-center rounded-[0.5rem] bg-[#FAFAFA] dark:bg-[#221506]",
                    )}
                  >
                    <Zoom>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${image.link}`}
                        alt={product.title}
                        width={1000}
                        height={1000}
                        loading="eager"
                        priority
                        className="w-fit object-contain"
                      />
                    </Zoom>
                  </div>
                ))}
              </div>
              <div className="flex w-full flex-col gap-10 md:w-1/2">
                <div className="flex flex-col gap-6">
                  <h1 className="text-3xl font-extrabold lg:text-5xl">
                    {product.title}
                  </h1>
                  <div className="flex w-fit flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xl text-red-700">
                        -{parseInt(product.discount)}%
                      </span>
                      <div className="flex text-[#0D1B39] dark:text-white">
                        <span className="text-base font-semibold">€</span>
                        <span className="text-3xl font-semibold">
                          {product.discount_Price}
                        </span>
                      </div>
                    </div>
                    <div className="flex text-gray-500">
                      <span className="mr-1">{t("productDetail.was")}:</span>
                      <span className="text-sm">€</span>
                      <span className="text-base">
                        <del>{product.price}</del>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 font-semibold text-[#0D1B39] dark:text-white">
                    <span>
                      {t("productDetail.inStock")}: {millify(product.quantity)}
                    </span>
                    <span>
                      {t("productDetail.sold")}: {parseInt(product.sold)}
                    </span>
                  </div>
                </div>
                <p className="text-base font-normal text-[#262626] opacity-80 dark:text-white lg:text-xl">
                  {product.description}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-normal text-[#262626] dark:text-white">
                    {t("productDetail.colors")}:
                  </span>
                  {product?.colors.map((color) => (
                    <Button
                      key={color.id}
                      title={`${color.name} Color`}
                      className={`bg-[${color.code}f] hover:bg-[${color.code}f] dark:bg-[${color.code}f] h-8 w-10 border border-[#262626] border-opacity-80`}
                    ></Button> // add f in bg cause response missing character
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-normal text-[#262626] dark:text-white">
                    {t("productDetail.sizes")}:
                  </span>
                  {product?.sizes.map((size) => (
                    <Button key={size.id} title={`${size.Size} Size`}>
                      {size.Size}
                    </Button>
                  ))}
                </div>
                {product.information.includes("\n\n") ? (
                  <Accordion type="multiple">
                    {product.information.split("\n\n").map((line, i) => (
                      <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger className="text-base text-[#262626] opacity-80 dark:text-white lg:text-xl">
                          {line.split(":")[0]}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm font-normal text-[#262626] opacity-80 dark:text-white lg:text-base">
                            {line.split(":").slice(1).join(":").trim()}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-base font-normal text-[#262626] opacity-80 dark:text-white lg:text-xl">
                    {product.information}
                  </p>
                )}
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-5">
                    <Button
                      onClick={handleIncrement}
                      disabled={isIncreasing}
                      className="rounded-full bg-[#D7D7D7] px-3 py-5 hover:bg-[#a2a2a2]"
                    >
                      {isIncreasing ? (
                        <Loader2 className="animate-spin text-white dark:text-black" />
                      ) : (
                        <Plus className="text-black" />
                      )}
                    </Button>
                    <span className="text-2xl font-extrabold">{quantity}</span>
                    <Button
                      onClick={handleDecrement}
                      disabled={isDecreasing || quantity <= 1}
                      className="rounded-full bg-[#D7D7D7] px-3 py-5 hover:bg-[#a2a2a2]"
                    >
                      {isDecreasing ? (
                        <Loader2 className="animate-spin text-white dark:text-black" />
                      ) : (
                        <Minus className="text-black" />
                      )}
                    </Button>
                  </div>
                  <Image
                    title="Share"
                    src="/icons/share_icon.svg"
                    alt="Share Product"
                    width={40}
                    height={50}
                    className="h-12 w-11 cursor-pointer"
                    onClick={handleShare}
                    loading="lazy"
                  />
                </div>
                <Button
                  onClick={addItemToCart}
                  className="w-full rounded-[2.5rem] py-6 text-xl font-normal"
                >
                  {isAdding ? (
                    <Loader2 className="animate-spin text-white dark:text-black" />
                  ) : (
                    t("productDetail.addToCart")
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <Image
        src="/shapes/shape9.svg"
        alt="Shape"
        width={300}
        height={300}
        className="absolute bottom-0 left-0 -z-10 h-auto w-auto opacity-0 md:opacity-100"
        loading="eager"
        priority
      />

      <Image
        src="/shapes/shape10.svg"
        alt="Shape"
        width={300}
        height={300}
        className="absolute -top-10 right-0 -z-10 h-auto w-auto opacity-0 md:opacity-100"
        loading="eager"
        priority
      />
    </section>
  );
};

export default ProductDetail;

const ProductDetailSkeleton = () => {
  return (
    <>
      <Skeleton className="h-6 w-80" />
      <div className="mt-20 flex flex-col justify-between gap-20 md:flex-row">
        <Skeleton className="h-80 w-full md:w-1/2" />
        <div className="flex w-full flex-col gap-10 md:w-1/2">
          <div className="flex flex-col gap-6">
            <Skeleton className="h-12 w-full" />
            <div className="flex w-fit flex-col gap-1">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-72 w-full" />
          <div className="flex w-full justify-between">
            <Skeleton className="h-12 w-[8.5rem]" />
            <Skeleton className="h-12 w-11" />
          </div>
          <Skeleton className="h-11 w-full" />
        </div>
      </div>
    </>
  );
};
