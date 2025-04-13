import CategoryDetail from "@/components/CategoryDetail";
import { getCategoryById } from "@/lib/getDataById";
import { PropsMetadata } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: PropsMetadata): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value || "en";
  const { id } = params;
  const category = await getCategoryById(id, lang);
  return {
    title: category.title,
    description: category.description,
  };
}

const CategoryDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <CategoryDetail id={id} />;
};

export default CategoryDetailPage;
