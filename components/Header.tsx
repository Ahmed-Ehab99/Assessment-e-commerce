"use client";

import Link from "next/link";
import Image from "next/image";
import { FaShoppingBag } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchForm from "./SearchForm";
import MenuSheet from "./MenuSheet";
import ThemeButton from "./ThemeButton";
import SearchIcon from "./SearchIcon";
import LangButton from "./LangButton";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Loader2, CircleUserRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SignOutApiResponse } from "@/types";
import Cookies from "js-cookie";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { useMemo, useTransition } from "react";

const Header = () => {
  const authToken = Cookies.get("authToken");
  const { t } = useTranslation();
  const { toast } = useToast();
  const { totalQty } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = useMemo(() => pathname === "/home", [pathname]);
  const queryClient = useQueryClient();
  const [isPendingAuth, startTransitionAuth] = useTransition();
  const [isPendingCart, startTransitionCart] = useTransition();
  const navLinks = useMemo(
    () => [
      { href: "/home", label: t("header.home") },
    ],
    [t],
  );

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.get<SignOutApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/out`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.isSuccessful) {
        toast({
          title: "Success",
          description: t("toast.signOutSuccess"),
          variant: "default",
        });
        Cookies.remove("authToken");
        localStorage.removeItem("orderData");
        queryClient.clear();
        router.push("/auth");
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: t("toast.signOutError"),
        variant: "destructive",
      });
    },
  });

  const handleSignOutClick = () => {
    signOutMutation.mutate();
  };

  return (
    <header className="absolute left-0 right-0 top-0 z-50 bg-transparent">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/home"
          className={cn(
            isHomePage ? "text-white" : "text-black dark:text-white",
            "text-2xl font-bold focus-within:outline-none focus-visible:outline-none",
          )}
          aria-label="Home"
        >
          {t("header.logo")}
        </Link>

        <nav
          className={cn(
            isHomePage ? "text-white" : "text-black dark:text-white",
            "hidden items-center justify-between gap-6 md:flex lg:gap-16",
          )}
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                pathname === link.href ? "font-extrabold" : "font-light",
                "text-base",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-7 md:gap-5 lg:gap-7">
          <SearchForm className="hidden md:block" />

          <Sheet>
            <SheetTrigger className="md:hidden">
              <SearchIcon />
            </SheetTrigger>
            <SheetContent side="top" className="size-full">
              <SheetHeader className="pt-10 text-left">
                <SheetTitle className="text-2xl font-extrabold md:text-3xl">
                  {t("searchSheet.title")}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  {t("searchSheet.description")}
                </SheetDescription>
              </SheetHeader>
              <div className="!my-0 flex flex-col gap-3">
                <h3 className="text-base font-normal md:text-xl">
                  {t("searchSheet.subTitle")}
                </h3>
                <SearchForm />
                <Image
                  src="/searchImg.png"
                  alt="Image"
                  width={200}
                  height={200}
                  className="w-full object-cover"
                />
              </div>
            </SheetContent>
          </Sheet>

          <button
            onClick={() => {
              startTransitionCart(() => {
                router.push("/cart");
              });
            }}
            aria-busy={isPendingCart}
            disabled={isPendingCart}
            className="relative"
          >
            {isPendingCart ? (
              <Loader2
                className={cn(
                  isHomePage ? "text-white" : "text-black dark:text-white",
                  "animate-spin",
                )}
              />
            ) : (
              <>
                <FaShoppingBag
                  size={20}
                  className={cn(
                    isHomePage ? "text-white" : "text-black dark:text-white",
                  )}
                />
                <span
                  className={cn(
                    isHomePage ? "text-white" : "text-black dark:text-white",
                    "absolute -right-3 -top-2 rounded-full bg-[#E58411] px-[6px] py-px text-sm",
                  )}
                >
                  {totalQty}
                </span>
              </>
            )}
          </button>

          <ThemeButton />

          <LangButton />

          <MenuSheet />

          {authToken ? (
            <button
              onClick={handleSignOutClick}
              disabled={signOutMutation.isPending}
              aria-label="Sign Out"
              aria-busy={signOutMutation.isPending}
            >
              {signOutMutation.isPending ? (
                <Loader2
                  className={cn(
                    isHomePage ? "text-white" : "text-black dark:text-white",
                    "animate-spin",
                  )}
                />
              ) : (
                <LogOut
                  className={cn(
                    isHomePage ? "text-white" : "text-black dark:text-white",
                  )}
                />
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                startTransitionAuth(() => {
                  router.push("/auth");
                });
              }}
              aria-busy={isPendingAuth}
              disabled={isPendingAuth}
            >
              {isPendingAuth ? (
                <Loader2
                  className={cn(
                    isHomePage ? "text-white" : "text-black dark:text-white",
                    "animate-spin",
                  )}
                />
              ) : (
                <CircleUserRound
                  className={cn(
                    isHomePage ? "text-white" : "text-black dark:text-white",
                  )}
                />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
