"use client";

import { useTranslation } from "react-i18next";
import FormsHeader from "./FormsHeader";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const deliveryAddressSchema = z.object({
  street: z.string().nonempty("Street address is required").min(2),
  state: z.string().nonempty("State address is required").min(2),
  country: z.string().nonempty("Country address is required").min(2),
});

type DeliveryFormData = z.infer<typeof deliveryAddressSchema>;
type Props = {
  onValid: (data: DeliveryFormData) => void;
  setIsStepValid: (valid: boolean) => void;
};

const CheckoutDataSec = ({ onValid, setIsStepValid }: Props) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const deliveryAddressForm = useForm<DeliveryFormData>({
    resolver: zodResolver(deliveryAddressSchema),
    defaultValues: {
      street: "",
      state: "",
      country: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    setIsStepValid(deliveryAddressForm.formState.isValid);
  }, [deliveryAddressForm.formState.isValid]);

  const onDeliveryAddressSubmit = (data: DeliveryFormData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onValid(data);
      toast({
        title: i18n.language === "ar" ? "تم حفظ البيانات" : "Data saved",
      });
    }, 1000);
  };

  return (
    <div className="container relative mx-auto my-16 max-w-5xl">
      <FormsHeader
        className="text-4xl md:text-5xl"
        subTitle={t("auth.subTitle")}
      />
      <div className="w-full">
        <span className="mb-20 text-base font-semibold uppercase md:text-xl">
          {i18n.language === "ar" ? "العنوان المرسل" : "Delivery address"}
        </span>
        <Form {...deliveryAddressForm}>
          <form
            onSubmit={deliveryAddressForm.handleSubmit(onDeliveryAddressSubmit)}
          >
            <div className="mt-10 space-y-3">
              <FormField
                control={deliveryAddressForm.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="rounded-none border-0 border-b border-black shadow-none focus-visible:ring-0 dark:border-white"
                        {...field}
                        placeholder={
                          i18n.language === "ar" ? "الشارع" : "Street"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={deliveryAddressForm.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="rounded-none border-0 border-b border-black shadow-none focus-visible:ring-0 dark:border-white"
                        {...field}
                        placeholder={
                          i18n.language === "ar" ? "المنطقة" : "State"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={deliveryAddressForm.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="rounded-none border-0 border-b border-black shadow-none focus-visible:ring-0 dark:border-white"
                        {...field}
                        placeholder={
                          i18n.language === "ar" ? "الدولة" : "Country"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="mt-10 flex w-1/4 justify-self-center rounded-2xl py-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : i18n.language === "ar" ? (
                "حفظ"
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutDataSec;
