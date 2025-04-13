import CategoryDetail from "@/components/CategoryDetail";
import { getCategoryById } from "@/lib/getDataById";
import { Metadata } from "next";
import { cookies } from "next/headers";

type Params = Promise<{
  id: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value || "en";
  const { id } = await params;
  const category = await getCategoryById(id, lang);
  return {
    title: category.title,
    description: category.description,
  };
}

const CategoryDetailPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  return <CategoryDetail id={id} />;
};

export default CategoryDetailPage;
