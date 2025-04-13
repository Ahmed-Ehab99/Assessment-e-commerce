"use client";

import { useCart } from "@/hooks/use-cart";
import { getProductById } from "@/lib/getDataById";
import { ProductData } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const CartDetails = () => {
  const { t, i18n } = useTranslation();
  const { cartItems, increaseItem, decreaseItem, removeItem, totalPrice } =
    useCart();
  const [productDetails, setProductDetails] = useState<
    Record<string, ProductData>
  >({});
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const cartItemIds = useMemo(
    () => cartItems.map((item) => item.id),
    [cartItems],
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      const products = await Promise.all(
        cartItemIds.map((id) => getProductById(id.toString(), i18n.language)),
      );

      const map: Record<string, ProductData> = {};
      products.forEach((product) => {
        map[product.id] = product;
      });

      setProductDetails(map);
      setLoadingProducts(false);
    };

    if (cartItemIds.length > 0) {
      fetchProducts();
    } else {
      setProductDetails({});
      setLoadingProducts(false);
    }
  }, [i18n.language, cartItemIds.join(","), cartItemIds]);

  const increaseQuantity = useCallback(
    (productId: string) => {
      setUpdatingItemId(productId);
      increaseItem(productId, {
        onSettled: () => setUpdatingItemId(null),
      });
    },
    [increaseItem],
  );

  const decreaseQuantity = useCallback(
    (productId: string) => {
      setUpdatingItemId(productId);
      decreaseItem(productId, {
        onSettled: () => setUpdatingItemId(null),
      });
    },
    [decreaseItem],
  );

  const handleRemoveItem = useCallback(
    (productId: string) => {
      setUpdatingItemId(productId);
      removeItem(productId);
      setTimeout(() => setUpdatingItemId(null), 500);
    },
    [removeItem],
  );

  return (
    <section className="flex flex-col items-center justify-center gap-10 py-40">
      <div className="relative flex flex-col items-center justify-center gap-5">
        <h1 className="text-5xl font-extrabold md:text-6xl">
          {t("cart.title")}
        </h1>
        <h2 className="text-base font-normal text-[#262626] opacity-80 dark:text-white md:text-xl">
          {t("cart.subTitle")}
        </h2>
        <Image
          src="/shapes/shape13.svg"
          alt="Shape"
          width={300}
          height={300}
          className="absolute -z-10 h-auto w-auto"
          loading="eager"
          priority
        />
      </div>
      {cartItems.length === 0 ? (
        <p className="text-2xl font-bold text-red-500">
          {i18n.language === "ar"
            ? "لا يوجد منتجات في العربة"
            : "No products in the cart"}
        </p>
      ) : loadingProducts ? (
        <CartDetailsSkeleton />
      ) : (
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 xl:p-0">
          <span className="text-base font-bold md:text-xl">
            {t("cart.items")} ({cartItems.length})
          </span>

          <div className="relative w-full">
            <div className="h-[30rem] overflow-y-auto scrollbar-none">
              <div className="flex flex-col gap-10 xs:gap-4">
                {cartItems.map((item) => {
                  const product = productDetails[item.id];
                  if (!product) return null;
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col items-center justify-between gap-6 border-b border-black dark:border-white xs:grid xs:grid-cols-3 xs:gap-3 xs:border-none md:gap-6 lg:grid-cols-4"
                    >
                      <div className="flex size-52 items-center justify-center rounded-3xl bg-[#FAFAFA] dark:bg-[#221506] xs:size-28 md:size-36">
                        <Image
                          key={product.productimage[0].id}
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${product.productimage[0].link}`}
                          alt={product.title}
                          width={500}
                          height={500}
                          className="size-full object-contain"
                        />
                      </div>

                      <div className="col-span-1 flex w-full flex-col items-center justify-between gap-4 lg:col-span-2 lg:flex-row">
                        <div className="flex flex-col items-center">
                          <h3 className="line-clamp-1 text-center text-xl font-semibold xs:text-sm md:text-base">
                            {item.name}
                          </h3>
                          <Link
                            className="text-base font-normal hover:text-primary xs:text-xs md:text-sm"
                            href={`/details/${item.id}`}
                          >
                            {t("cart.aboutItem")}
                          </Link>
                        </div>

                        <div className="flex items-center justify-center gap-3 md:gap-5">
                          <button
                            onClick={() => handleRemoveItem(item.id.toString())}
                          >
                            <Trash2 className="size-6 duration-200 hover:text-red-500 xs:size-4 md:size-6" />
                          </button>
                          <div className="flex items-center gap-3">
                            <button
                              disabled={
                                updatingItemId === item.id.toString() ||
                                Number(item.qty) <= 1
                              }
                              onClick={() =>
                                decreaseQuantity(item.id.toString())
                              }
                              className="flex size-8 items-center justify-center rounded-full bg-black duration-200 hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:hover:bg-white/80 xs:size-4 md:size-8"
                            >
                              <Minus
                                size={20}
                                className="text-white dark:text-black"
                              />
                            </button>
                            <span className="text-base font-semibold xs:text-sm md:text-base">
                              {Number(item.qty) < 10
                                ? `0${item.qty}`
                                : `${item.qty}`}
                            </span>
                            <button
                              disabled={
                                updatingItemId === item.id.toString() ||
                                Number(item.qty) >= product.quantity
                              }
                              onClick={() =>
                                increaseQuantity(item.id.toString())
                              }
                              className="flex size-8 items-center justify-center rounded-full bg-black duration-200 hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:hover:bg-white/80 xs:size-4 md:size-8"
                            >
                              <Plus
                                size={20}
                                className="text-white dark:text-black"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-1 font-semibold">
                        <span className="text-base xs:text-xs md:text-base">
                          €
                        </span>
                        <span className="text-2xl xs:text-base md:text-2xl">
                          {item.subtotal}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-40 border-b border-black bg-gradient-to-t from-white via-white/70 to-transparent dark:border-white dark:from-black/70 dark:via-black/70 dark:to-transparent xl:-bottom-1" />
          </div>

          <div className="w-full">
            <div className="mb-10 flex justify-between">
              <span className="text-xl font-bold">{t("cart.total")}</span>
              <div className="flex justify-end gap-1 font-bold">
                <span className="text-sm">€</span>
                <span className="text-xl">{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Button
              asChild
              className="h-fit w-full rounded-full py-3 text-base font-bold text-black dark:text-white"
            >
              <Link href="/checkout">{t("cart.placeOrder")}</Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartDetails;

const CartDetailsSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 xl:p-0">
      <Skeleton className="h-7 w-20" />
      <div className="w-full">
        <div className="h-[30rem]">
          <div className="flex flex-col gap-10 xs:gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-between gap-6 xs:grid xs:grid-cols-3 xs:gap-3 md:gap-6 lg:grid-cols-4"
              >
                <Skeleton className="size-52 rounded-3xl xs:size-28 md:size-36" />
                <div className="col-span-1 flex w-full flex-col items-center justify-between gap-4 lg:col-span-2 lg:flex-row">
                  <Skeleton className="h-11 w-28 xs:w-24 md:w-40" />
                  <Skeleton className="h-11 w-28 xs:w-24 md:w-40" />
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-11 w-20" />
                </div>
              </div>
            ))}
            <div className="w-full">
              <div className="mb-10 flex justify-between">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-7 w-20" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
