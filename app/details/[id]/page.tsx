import ProductDetail from "@/components/ProductDetail";
import { getProductById } from "@/lib/getDataById";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const cookieStore = cookies();
  const lang = (await cookieStore).get("language")?.value || "en";
  const { id } = params;
  const product = await getProductById(id, lang);
  return {
    title: product.title,
    description: product.description,
  };
}

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <ProductDetail id={id} />;
};

export default ProductDetailsPage;
