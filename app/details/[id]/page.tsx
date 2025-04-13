import ProductDetail from "@/components/ProductDetail";
import { getProductById } from "@/lib/getDataById";
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
  const product = await getProductById(id, lang);
  return {
    title: product.title,
    description: product.description,
  };
}

const ProductDetailsPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  return <ProductDetail id={id} />;
};

export default ProductDetailsPage;
