"use client";

import { ProductData } from "@/types";
import { Loader2, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { handleAddToCart } from "@/lib/addToCart";

const ProductsCard = ({ product }: { product: ProductData }) => {
  const { t } = useTranslation();
  const { addItem, isAdding } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const addItemToCart = () => {
    handleAddToCart({
      productId: product.id.toString(),
      qty: 1,
      t,
      router,
      toast,
      addItem
    });
  }

  return (
    <div className="flex size-full flex-col">
      <Link href={`/details/${product.id}`} className="relative size-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${product.productimage[0].link}`}
          alt={product.title}
          width={500}
          height={500}
          quality={100}
          priority
          className="size-full object-contain"
        />
        <div className="absolute inset-0 top-16 -z-10 w-full rounded-t-3xl bg-[#FAFAFA] dark:bg-[#221506] md:h-44 lg:h-52 xl:h-72">
          {parseInt(product.discount) > 0 ? (
            <span className="absolute bottom-1 left-1 rounded-full bg-primary px-1 py-1 text-xs font-extrabold text-white lg:bottom-2 lg:left-2 lg:px-2 lg:text-base">
              {parseInt(product.discount)}%
            </span>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-col gap-10 px-3 py-6">
        <div className="flex flex-col">
          <span className="text-xl font-normal text-[#8D8D8D] xs:text-xs md:text-sm lg:text-base">
            {t("productCard.chair")}
          </span>
          <h4 className="line-clamp-1 text-2xl font-semibold text-[#0D1B39] dark:text-white xs:text-base lg:text-xl">
            {product.title}
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {parseInt(product.discount) ? (
              <div className="flex gap-1 text-[#8D8D8D]">
                <span className="text-xs font-semibold lg:text-sm">€</span>
                <span className="font-semibold xs:text-sm lg:text-base">
                  <del>{product.price}</del>
                </span>
              </div>
            ) : (
              <div className="flex gap-1">
                <span className="invisible text-sm font-semibold xs:text-xs">
                  €
                </span>
                <span className="invisible text-xl font-semibold xs:text-base lg:text-base">
                  0
                </span>
              </div>
            )}
            <div className="flex gap-1 text-[#0D1B39] dark:text-white">
              <span className="text-xl font-semibold xs:text-xs md:text-sm lg:text-base">
                €
              </span>
              <span className="text-2xl font-semibold xs:text-base lg:text-xl">
                {product.discount_Price}
              </span>
            </div>
          </div>
          <Button
            onClick={addItemToCart}
            disabled={isAdding}
            className="rounded-full bg-[#0D1B39] px-2 py-4 hover:bg-[#0d1b39a6] dark:bg-white dark:hover:bg-white/80 md:px-3 md:py-5"
          >
            {isAdding ? (
              <Loader2 className="animate-spin text-white dark:text-black" />
            ) : (
              <Plus className="text-white dark:text-black" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
