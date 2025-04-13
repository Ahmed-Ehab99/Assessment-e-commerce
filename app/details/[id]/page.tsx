import ProductDetail from "@/components/ProductDetail";
import { getProductById } from "@/lib/getDataById";
import { PropsMetadata } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: PropsMetadata): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value || "en";
  const { id } = params;
  const product = await getProductById(id, lang);
  return {
    title: product.title,
    description: product.description,
  };
}

export const dynamic = "force-static";
export const revalidate = 60;

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <ProductDetail id={id} />;
};

export default ProductDetailsPage;
