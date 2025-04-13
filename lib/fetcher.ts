import { ApiResponse } from "@/types";
import Cookies from "js-cookie";
import i18n from "@/lib/i18n";

export const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const token = Cookies.get("authToken");
  const lang = i18n.language || "en";

  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      ...(isFormData
        ? {} // Don't set Content-Type for FormData
        : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${token}`,
      "Accept-Language": lang,
      ...(options.headers || {}),
    },
  });

  const result: ApiResponse<T> = await res.json();

  if (!res.ok || !result.isSuccessful) {
    throw new Error(
      result.message || result.detailed_error || "Something went wrong",
    );
  }

  return result.data as T;
};
