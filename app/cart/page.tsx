import CartDetails from "@/components/CartDetails";
import { getLanguageFromCookies } from "@/lib/getLanguageFromCookies";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLanguageFromCookies();
  return {
    title:
      lang === "ar"
        ? "سلة التسوق - أثاث وديكور عصري"
        : "Shopping Cart - Modern Furniture & Home Decor",
    description:
      lang === "ar"
        ? "راجع محتويات سلة التسوق الخاصة بك، واحفظ اختياراتك من الأثاث العصري والديكور المميز قبل إتمام عملية الشراء."
        : "Review the items in your shopping cart and keep track of your selected modern furniture and home decor before checkout.",
    keywords:
      lang === "ar"
        ? "سلة التسوق، أثاث، ديكور المنزل، الدفع، أثاث عصري"
        : "shopping cart, furniture, home decor, checkout, modern furniture",
    robots: "index, follow",
    alternates: {
      canonical: "/cart",
    },
  };
}

const page = () => {
  return <CartDetails />;
};

export default page;
