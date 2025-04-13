"use client";

import FormsHeader from "./FormsHeader";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

type Props = {
  paymentMethod: "card" | "paypal" | null;
  setPaymentMethod: (value: "card" | "paypal") => void;
  setIsStepValid: (valid: boolean) => void;
};

const CheckoutPaymentSec = ({
  paymentMethod,
  setPaymentMethod,
  setIsStepValid,
}: Props) => {
  const { t, i18n } = useTranslation();

  const handleChange = (value: "card" | "paypal") => {
    setPaymentMethod(value);
    setIsStepValid(true);
  };

  return (
    <div className="container relative mx-auto my-16 max-w-5xl">
      <FormsHeader
        className="text-4xl md:text-5xl"
        subTitle={t("auth.subTitle")}
      />
      <div className="w-full">
        <span className="mb-20 text-base font-semibold uppercase md:text-xl">
          {i18n.language === "ar" ? "طريقه الدفع" : "Payment method"}
        </span>
        <RadioGroup
          value={paymentMethod || ""}
          onValueChange={(val) => handleChange(val as "card" | "paypal")}
          className="mt-10 gap-0 space-y-5"
        >
          <div className="flex items-center justify-between border-b border-black/20 pb-5">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card-option" />
              <Label htmlFor="card-option">
                {i18n.language === "ar" ? "فيزا" : "Card Payment"}
              </Label>
            </div>
            <Image
              src="/visa.svg"
              alt="Visa Card"
              width={100}
              height={50}
              className="w-auto"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal-option" />
              <Label htmlFor="paypal-option">
                {i18n.language === "ar" ? "باي بال" : "Paypal"}
              </Label>
            </div>
            <Image
              src="/paypal.svg"
              alt="Paypal Card"
              width={100}
              height={50}
              className="w-auto"
            />
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default CheckoutPaymentSec;
