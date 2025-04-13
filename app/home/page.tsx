import CategorySec from "@/components/CategorySec";
import FeaturesSec from "@/components/FeaturesSec";
import FurnishSec from "@/components/FurnishSec";
import HeroSec from "@/components/HeroSec";
import { getLanguageFromCookies } from "@/lib/getLanguageFromCookies";
import { Metadata } from "next";
import Image from "next/image";


export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLanguageFromCookies();
  return {
    title:
      lang === "ar"
        ? "الأثاث الحديث والديكور المنزلي"
        : "Modern Furniture & Home Decor",
    description:
      lang === "ar"
        ? "تسوق من مجموعتنا المختارة بعناية من الأثاث والديكورات المنزلية الأنيقة. ستجد كل ما تحتاجه لإضفاء لمسة من الراحة والأناقة على مساحة معيشتك."
        : "Shop our curated collection of stylish furniture and home decor. Find everything you need to transform your living space with comfort and elegance.",
    keywords:
      lang === "ar"
        ? "أثاث، ديكور المنزل، أثاث عصري، تصميم داخلي، أثاث غرفة المعيشة، أثاث غرفة النوم، أثاث المطبخ"
        : "furniture, home decor, modern furniture, interior design, living room furniture, bedroom furniture, kitchen furniture",
  };
}

export const dynamic = "force-static";
export const revalidate = 60;

export default async function HomePage() {
  return (
    <div className="relative">
      <HeroSec />

      <CategorySec />

      <FurnishSec />

      <FeaturesSec />

      <Image
        src="/shapes/shape3.svg"
        alt=""
        width={300}
        height={300}
        className="absolute left-0 top-96 -z-10 hidden h-auto w-auto md:block xl:top-[40%]"
        loading="eager"
        priority
      />

      <Image
        src="/shapes/shape4.svg"
        alt=""
        width={300}
        height={300}
        className="absolute bottom-20 left-0 hidden h-auto w-auto md:block"
        loading="eager"
        priority
      />

      <Image
        src="/shapes/shape5.svg"
        alt=""
        width={300}
        height={300}
        className="absolute bottom-[40%] right-0 -z-10 hidden h-auto w-auto md:bottom-[30%] md:block xl:bottom-[15%]"
        loading="eager"
        priority
      />
    </div>
  );
}
