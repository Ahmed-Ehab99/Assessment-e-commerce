"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AuthFormProps, SignUpData, UserApiResponse } from "@/types";
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
import { AtSign, Loader2, LockKeyhole, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useCart } from "@/hooks/use-cart";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useEffect } from "react";

const SignUpSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 2 characters"),
  lastname: z
    .string()
    .nonempty("Lastname is required")
    .min(3, "Lastname must be at least 2 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      "Password must include letters, numbers, and special characters",
    ),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});

const SignUpForm = ({
  onValidChange,
  disableRedirect = false,
  onAuthSuccess,
}: AuthFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();
  const { refetch: refetchCart } = useCart();

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpData) => {
      const response = await axios.post<UserApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        data,
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.isSuccessful && data.data?.token) {
        toast({
          title: "Success",
          description: t("toast.signUpSuccess"),
          variant: "default",
        });
        Cookies.set("authToken", data.data.token);
        if (!disableRedirect) {
          router.push("/home");
        }
        if (onAuthSuccess) onAuthSuccess();
        refetchCart();
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: t("toast.signUpError"),
        variant: "destructive",
      });
    },
  });

  const signUpForm = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSignUpSubmit = (data: z.infer<typeof SignUpSchema>) => {
    signUpMutation.mutate(data);
  };

  useEffect(() => {
    if (!onValidChange) return;
    const subscription = signUpForm.watch(() => {
      const isValid = signUpForm.formState.isValid;
      onValidChange(isValid);
    });

    return () => subscription.unsubscribe();
  }, [signUpForm, onValidChange]);

  return (
    <Card className="flex h-full flex-col rounded-3xl bg-[#fbfbfb] p-4 dark:border-none dark:bg-[#221506] lg:p-6">
      <CardHeader className="mb-2 px-0 text-black dark:text-white">
        <h2 className="text-center text-xl font-bold uppercase lg:text-2xl">
          {t("auth.signUp.title")}
        </h2>

        <p className="text-center text-sm font-normal lg:text-base">
          {t("auth.signUp.subTitle")}
        </p>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col">
        <Form {...signUpForm}>
          <form
            onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
            className="flex flex-grow flex-col justify-between"
          >
            <div className="space-y-6">
              <FormField
                control={signUpForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <User
                          size={20}
                          className="text-black dark:text-white"
                        />
                        <Input
                          className="rounded-none border-0 border-b border-black shadow-none focus-visible:ring-0 dark:border-white"
                          placeholder={t("auth.signUp.firstName")}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <User
                          size={20}
                          className="text-black dark:text-white"
                        />
                        <Input
                          className="rounded-none border-0 border-b border-black shadow-none focus-visible:ring-0 dark:border-white"
                          placeholder={t("auth.signUp.lastName")}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <AtSign
                          size={20}
                          className="text-black dark:text-white"
                        />
                        <Input
                          className="rounded-none border-0 border-b border-black shadow-none focus-visible:ring-0 dark:border-white"
                          placeholder={t("auth.signUp.email")}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <LockKeyhole
                          size={20}
                          className="text-black dark:text-white"
                        />
                        <Input
                          type="password"
                          placeholder={t("auth.signUp.password")}
                          className="rounded-none border-0 border-b border-black shadow-none focus-visible:ring-0 dark:border-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-row items-start gap-2">
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-black dark:text-white"
                        >
                          <p className="mb-4">{t("auth.signUp.terms1")}</p>
                          <p>
                            {t("auth.signUp.terms2")}{" "}
                            <a
                              href="#"
                              className="underline hover:text-[#E58411]"
                            >
                              {t("auth.signUp.privacy")}
                            </a>
                          </p>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="mt-10 w-full rounded-2xl bg-[#E58411] py-2 text-white hover:bg-orange-600"
              disabled={!signUpForm.formState.isValid}
            >
              {signUpMutation.isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                t("auth.signUp.signUpBtn")
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
