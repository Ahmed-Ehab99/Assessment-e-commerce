"use client";

import Stepper, { Step } from "@/components/CheckoutSteps";
import { useEffect, useState } from "react";
import AuthSec from "./AuthSec";
import CheckoutDataSec from "./CheckoutDataSec";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { DeliveryApiResponse } from "@/types";
import Cookies from "js-cookie";
import CheckoutPaymentSec from "./CheckoutPaymentSec";
import ReviewSec from "./ReviewSec";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const CheckoutSec = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { i18n } = useTranslation();
  const [isStep1Valid, setIsStep1Valid] = useState(false);
  const [isStep2Valid, setIsStep2Valid] = useState(false);
  const [isStep3Valid, setIsStep3Valid] = useState(false);
  const [authType, setAuthType] = useState<"signin" | "signup" | null>(null);
  const [deliveryData, setDeliveryData] = useState<{
    street: string;
    state: string;
    country: string;
  } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | null>(
    null,
  );
  const [orderData, setOrderData] = useState<DeliveryApiResponse | null>(null);

  const validateStep = async (step: number) => {
    switch (step) {
      case 1:
        return isStep1Valid;
      case 2:
        return isStep2Valid;
      case 3:
        return isStep3Valid;
      default:
        return true;
    }
  };

  const handleOrderCreate = async ({
    payment_method,
  }: {
    payment_method: "card" | "paypal";
  }) => {
    if (!deliveryData) {
      toast({
        title:
          i18n.language === "ar"
            ? "من فضلك قم بإدخال البيانات المطلوبة"
            : "Missing data",
        description:
          i18n.language === "ar"
            ? "يرجى إكمال البيانات المطلوبة أولا"
            : "Please complete delivery info first",
        variant: "destructive",
      });
      return null;
    }

    try {
      const payload = {
        shipping_street_address: deliveryData.street,
        shipping_state: deliveryData.state,
        shipping_country: deliveryData.country,
        payment_method,
      };

      const res = await axios.post<DeliveryApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        },
      );

      if (res.data.isSuccessful) {
        setOrderData(res.data);
        localStorage.setItem("orderData", JSON.stringify(res.data));
        return res.data;
      }

      return null;
    } catch {
      toast({
        title: i18n.language === "ar" ? "خطأ" : "Error",
        description:
          i18n.language === "ar" ? "حدث خطأ ما" : "Oops! Something went wrong",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    const storedOrder = localStorage.getItem("orderData");
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
    }
    const storedDelivery = localStorage.getItem("deliveryData");
    if (storedDelivery) {
      setDeliveryData(JSON.parse(storedDelivery));
      setIsStep2Valid(true);
    }
  }, []);

  return (
    <Stepper
      initialStep={1}
      stepLabels={[
        authType === "signin"
          ? i18n.language === "ar"
            ? "تسجيل دخول"
            : "Sign In"
          : authType === "signup"
            ? i18n.language === "ar"
              ? "إنشاء حساب"
              : "Register"
            : i18n.language === "ar"
              ? "تسجيل دخول / إنشاء حساب"
              : "Register / Sign In",
        i18n.language === "ar" ? "البيانات" : "Data",
        i18n.language === "ar" ? "الدفع" : "Payment",
        i18n.language === "ar" ? "مراجعة" : "Review",
      ]}
      onStepChange={async () => true}
      onFinalStepCompleted={() => {
        router.push("/thanks");
      }}
      backButtonText={i18n.language === "ar" ? "رجوع" : "Back"}
      nextButtonText={i18n.language === "ar" ? "التالي" : "Next"}
      validateStep={validateStep}
    >
      <Step>
        <AuthSec
          setIsStep1Valid={setIsStep1Valid}
          setAuthType={setAuthType}
          disableRedirect
        />
      </Step>

      <Step>
        <CheckoutDataSec
          onValid={(data) => {
            setDeliveryData(data);
            localStorage.setItem("deliveryData", JSON.stringify(data));
            setIsStep2Valid(true);
          }}
          setIsStepValid={setIsStep2Valid}
        />
      </Step>

      <Step>
        <CheckoutPaymentSec
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setIsStepValid={setIsStep3Valid}
        />
      </Step>

      <Step>
        <ReviewSec
          orderData={orderData}
          paymentMethod={paymentMethod}
          onBuyNow={handleOrderCreate}
        />
      </Step>
    </Stepper>
  );
};

export default CheckoutSec;
