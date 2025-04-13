import { useToast } from "@/hooks/use-toast";
import { DeliveryApiResponse } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormsHeader from "./FormsHeader";
import { useTranslation } from "react-i18next";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type Props = {
  orderData: DeliveryApiResponse | null;
  paymentMethod: "card" | "paypal" | null;
  onBuyNow: (data: {
    payment_method: "card" | "paypal";
  }) => Promise<DeliveryApiResponse | null>;
};

const ReviewSec = ({ orderData, paymentMethod, onBuyNow }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { clearCart } = useCart();
  const [localOrderData, setLocalOrderData] = useState(orderData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!localOrderData && paymentMethod && orderData === null) {
        setLoading(true);
        const result = await onBuyNow({ payment_method: paymentMethod });
        if (result) {
          setLocalOrderData(result);
        }
        setLoading(false);
      }
    };

    fetchOrder();
  }, [localOrderData, paymentMethod, onBuyNow, toast, orderData]);

  const handleBuyNow = async () => {
    if (!localOrderData) return;

    clearCart();
    toast({
      title: i18n.language === "ar" ? "مبروك" : "Success",
      description: i18n.language === "ar" ? "تم إنشاء الطلب" : "Order created",
      variant: "default",
    });
    localStorage.removeItem("orderData");
    localStorage.removeItem("deliveryData");
    router.push("/thanks");
  };

  if (loading || !localOrderData) {
    return <ReviewSecSkeleton />;
  }

  const address = localOrderData.data?.shipping_address
    ? (() => {
        try {
          return JSON.parse(localOrderData.data.shipping_address);
        } catch {
          return null;
        }
      })()
    : null;

  return (
    <div className="container relative mx-auto my-16 max-w-5xl">
      <FormsHeader
        className="text-4xl md:text-5xl"
        subTitle={t("auth.subTitle")}
      />
      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold uppercase md:text-xl">
          {i18n.language === "ar" ? "مراجعة الطلب" : "Review order"}
        </span>
        <span className="text-sm font-normal text-[#494949] dark:text-white md:text-base">
          {i18n.language === "ar"
            ? `عزيزي ${localOrderData.data?.user.name}, يرجى التحقق من المعلومات الخاصة بك للدقة.`
            : `Dear ${localOrderData.data?.user.name}, please check your information for accuracy.`}
        </span>
      </div>

      <div className="mt-5 flex w-full flex-col justify-between gap-20 md:flex-row">
        <div className="flex w-full flex-col gap-3">
          <span className="text-base font-semibold uppercase md:text-xl">
            {i18n.language === "ar" ? "سله مشترياتك" : "Your shopping cart"} (
            {localOrderData.data?.order_details.length})
          </span>
          <div className="flex h-[30rem] w-full flex-col overflow-y-auto rounded-3xl bg-[#F0F0F0] dark:bg-[#221506]">
            {localOrderData.data?.order_details.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 border-b border-black/20 p-4 dark:border-white/20 md:flex-row"
              >
                <div className="flex size-32 items-center justify-center rounded-3xl bg-[#FAFAFA] dark:bg-[#221506]">
                  <Image
                    src={item.image_link}
                    alt={item.Product_Name}
                    width={500}
                    height={500}
                    className="size-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-base font-medium text-[#2F2F2F] dark:text-white">
                    {item.Product_Name}
                  </span>
                  <span className="text-xs font-normal text-[#2F2F2F] dark:text-white">
                    {i18n.language === "ar" ? "عن الكرسي" : "About the chair"}
                  </span>
                  <span className="text-xs font-normal text-[#2F2F2F] dark:text-white">
                    {i18n.language === "ar" ? "الكمية" : "Quantity"}:{" "}
                    {item.Quantity}
                  </span>
                  <div className="flex gap-1 font-semibold">
                    <span className="text-sm">€</span>
                    <span className="text-xl">{item.Total_Price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-10">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <div className="flex w-full flex-col gap-3">
              <span className="text-base font-semibold uppercase md:text-xl">
                {i18n.language === "ar" ? "العنوان المرسل" : "Delivery address"}
              </span>
              <div className="min-h-48 rounded-3xl bg-[#F0F0F0] dark:bg-[#221506]">
                {address ? (
                  <div className="p-4">
                    <p className="text-base font-normal">
                      <strong>
                        {i18n.language === "ar" ? "الشارع" : "Street"}:
                      </strong>{" "}
                      {address.street}
                    </p>
                    <p className="text-base font-normal">
                      <strong>
                        {i18n.language === "ar" ? "المنطقة" : "State"}:
                      </strong>{" "}
                      {address.state}
                    </p>
                    <p className="text-base font-normal">
                      <strong>
                        {i18n.language === "ar" ? "الدولة" : "Country"}:
                      </strong>{" "}
                      {address.country}
                    </p>
                  </div>
                ) : (
                  <p className="text-base font-normal">
                    {i18n.language === "ar"
                      ? "عنوان غير صالح أو مفقود"
                      : "Invalid or missing address"}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col gap-3">
              <span className="text-base font-semibold uppercase md:text-xl">
                {i18n.language === "ar" ? "طريقة الدفع" : "Payment"}
              </span>
              <div className="min-h-48 rounded-3xl bg-[#F0F0F0] p-4 dark:bg-[#221506]">
                <span className="text-base font-normal">
                  {localOrderData.data?.Payment_Method}
                </span>
                <Image
                  src="/visa.svg"
                  alt="Visa Card"
                  width={100}
                  height={50}
                  className="mt-5 w-auto"
                />
              </div>
            </div>
          </div>
          <hr className="w-full border-black/20 dark:border-white/20" />
          <div className="flex w-full items-center justify-between">
            <span>{i18n.language === "ar" ? "المجموع" : "Total"}</span>
            <div className="flex gap-1 font-semibold">
              <span className="text-base">€</span>
              <span className="text-2xl">
                {localOrderData.data?.Grand_Total}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleBuyNow} className="mt-10 h-fit w-full rounded-2xl">
        {i18n.language === "ar" ? "إنشاء الطلب" : "Buy Now"}
      </Button>
    </div>
  );
};

export default ReviewSec;

const ReviewSecSkeleton = () => {
  return (
    <div className="container relative mx-auto my-16 max-w-5xl">
      <Skeleton className="mb-12 h-20 w-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-6 w-80" />
      </div>
      <div className="mt-5 flex w-full flex-col justify-between gap-20 md:flex-row">
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-7 w-full" />
          <div className="flex h-[30rem] w-full flex-col overflow-y-auto rounded-3xl">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 border-b border-black/20 p-4 dark:border-white/20 md:flex-row"
              >
                <div className="flex size-32 items-center justify-center rounded-3xl bg-[#FAFAFA] dark:bg-[#221506]">
                  <Skeleton className="size-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-10">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <div className="flex w-full flex-col gap-3">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="min-h-48 w-full rounded-3xl" />
            </div>
            <div className="flex w-full flex-col gap-3">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="min-h-48 w-full rounded-3xl" />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-7 w-32" />
          </div>
        </div>
      </div>
      <Skeleton className="mt-10 h-9 w-full rounded-2xl" />
    </div>
  );
};
