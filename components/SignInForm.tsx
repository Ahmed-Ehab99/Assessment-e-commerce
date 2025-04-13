"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AuthFormProps, SignInData, UserApiResponse } from "@/types";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AtSign, Loader2, LockKeyhole } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useCart } from "@/hooks/use-cart";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useEffect } from "react";

const SignInSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SignInForm = ({
  onValidChange,
  disableRedirect = false,
  onAuthSuccess,
}: AuthFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { refetch: refetchCart } = useCart();

  const signInMutation = useMutation({
    mutationFn: async (data: SignInData) => {
      const response = await axios.post<UserApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        data,
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.isSuccessful && data.data?.token) {
        Cookies.set("authToken", data.data.token);
        refetchCart();
        toast({
          title: i18n.language === "ar" ? "مبروك" : "Success",
          description: t("toast.signInSuccess"),
          variant: "default",
        });
        if (!disableRedirect) {
          router.push("/home");
        }
        if (onAuthSuccess) onAuthSuccess();
      }
    },
    onError: () => {
      toast({
        title: i18n.language === "ar" ? "خطأ" : "Error",
        description: t("toast.signInError"),
        variant: "destructive",
      });
    },
  });

  const signInForm = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignInSubmit = (data: z.infer<typeof SignInSchema>) => {
    signInMutation.mutate(data);
  };

  useEffect(() => {
    if (!onValidChange) return;
    const subscription = signInForm.watch(() => {
      const isValid = signInForm.formState.isValid;
      onValidChange(isValid);
    });

    return () => subscription.unsubscribe();
  }, [signInForm, onValidChange]);

  return (
    <Card className="flex h-full flex-col rounded-3xl bg-[#fbfbfb] p-4 dark:border-none dark:bg-[#221506] lg:p-6">
      <CardHeader className="mb-5 px-0 text-center text-xl font-bold uppercase text-black dark:text-white md:mb-10 lg:text-2xl">
        {t("auth.signIn.title")}
      </CardHeader>

      <CardContent className="flex flex-grow flex-col">
        <Form {...signInForm}>
          <form
            onSubmit={signInForm.handleSubmit(onSignInSubmit)}
            className="flex flex-grow flex-col justify-between gap-5 md:gap-0"
          >
            <div className="space-y-6">
              <FormField
                control={signInForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <AtSign
                          size={20}
                          className="text-black dark:text-white"
                        />
                        <Input
                          className="rounded-none border-0 border-b border-black shadow-none focus-visible:ring-0 dark:border-white"
                          {...field}
                          placeholder={t("auth.signIn.email")}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <LockKeyhole
                          size={20}
                          className="text-black dark:text-white"
                        />
                        <Input
                          type="password"
                          className="rounded-none border-0 border-b border-black shadow-none focus-visible:ring-0 dark:border-white"
                          {...field}
                          placeholder={t("auth.signIn.password")}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="mt-auto w-full rounded-2xl bg-[#E58411] py-2 text-white hover:bg-orange-600"
              disabled={!signInForm.formState.isValid}
            >
              {signInMutation.isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                t("auth.signIn.signInBtn")
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
