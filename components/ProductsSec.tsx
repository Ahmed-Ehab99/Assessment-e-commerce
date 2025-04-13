"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Cookies from "js-cookie";
import { ProductData, ProductsApiResponse } from "@/types";
import ProductsCard from "./ProductsCard";
import { Skeleton } from "./ui/skeleton";
import { useCallback, useMemo, useState } from "react";
import PaginationBar from "./PaginationBar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const ProductsSec = ({ categoryID }: { categoryID: number | undefined }) => {
  const { i18n } = useTranslation();
  const lang = useMemo(() => i18n.language, [i18n.language]);
  const [page, setPage] = useState(1);
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery<ProductsApiResponse | null>({
    queryKey: ["products", categoryID, lang, page],
    queryFn: useCallback(async () => {
      if (!categoryID) return null;
      const authToken = Cookies.get("authToken");
      const response = await axios.get<ProductsApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/category?category_id=${categoryID}&page=${page}`,
        {
          headers: {
            "Accept-Language": lang,
            "Country-Id": 1,
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      if (response.data.success && response.data.data) {
        return response.data;
      }
      throw new Error(response.data.message || "Could not retrieve products.");
    }, [lang]),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!categoryID,
  });

  const productsGrid = useMemo(() => {
    if (isLoading) return <ProductsCardSkeleton />;
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
      <div className="grid grid-cols-1 items-center justify-center gap-x-10 gap-y-14 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.data &&
          products?.data?.length > 0 &&
          products?.data?.map((product: ProductData) => (
            <ProductsCard key={product.id} product={product} />
          ))}
      </div>
    );
  }, [products, isLoading, isError, error]);

  return (
    <div className="container mx-auto px-6 pb-24 pt-32">
      {productsGrid}
      {products?.meta && (
        <div className="mt-10 flex justify-center">
          <PaginationBar
            currentPage={products.meta.current_page}
            totalPages={products.meta.last_page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsSec;

const ProductsCardSkeleton = () => (
  <div className="grid grid-cols-1 items-center justify-center gap-x-10 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="flex size-full flex-col">
        <div className="size-full">
          <Skeleton className="h-[21rem] w-full rounded-3xl md:h-48 lg:h-56 xl:h-80" />
        </div>
        <div className="flex flex-col gap-10 px-3 py-6">
          <div className="flex flex-col">
            <Skeleton className="h-9 w-24 md:h-7 md:w-20 lg:h-6" />
            <Skeleton className="h-9 w-full md:h-7 lg:h-6" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-9 w-20 md:h-7 md:w-16" />
            <Skeleton className="size-10 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
