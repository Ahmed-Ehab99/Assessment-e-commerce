import AuthSec from "@/components/AuthSec";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value || "en";
  return {
    title: lang === "ar" ? "سجل دخول او أنشأ حساب جديد" : "Sign In or Register",
    description:
      lang === "ar"
        ? "قم بتسجيل الدخول إلى حسابك أو قم بإنشاء حساب جديد لتتمكن من التسوق من مجموعات الأثاث والديكورات المنزلية الحصرية لدينا."
        : "Sign in to your account or create a new one to shop our exclusive furniture and home decor collections.",
  };
}

const AuthPage = () => {
  return (
    <section className="relative pt-16">
      <AuthSec />

      <Image
        src="/shapes/shape1.svg"
        alt="Shape"
        width={300}
        height={300}
        className="absolute left-0 top-80 -z-10 h-auto w-auto opacity-0 md:opacity-100 xl:top-0"
        loading="eager"
        priority
      />

      <Image
        src="/shapes/shape2.svg"
        alt="Shape"
        width={300}
        height={300}
        className="absolute right-0 top-0 -z-10 h-auto w-auto opacity-0 md:opacity-100 xl:top-24"
        loading="eager"
        priority
      />
    </section>
  );
};

export default AuthPage;
