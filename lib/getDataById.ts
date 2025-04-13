import { CategoryData, ProductData } from "@/types";
import { getApiData } from "./getApiData";

export function getCategoryById(
  id: string,
  lang: string,
): Promise<CategoryData> {
  return getApiData<CategoryData>(`/api/category/find/${id}`, lang);
}

export async function getProductById(
  id: string,
  lang: string,
): Promise<ProductData> {
  return getApiData<ProductData>(`/api/product/find/${id}`, lang);
}