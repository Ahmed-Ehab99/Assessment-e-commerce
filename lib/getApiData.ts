import axios from "axios";
import { ApiResponse } from "@/types";

export async function getApiData<T>(url: string, lang: string): Promise<T> {
  const response = await axios.get<ApiResponse<T>>(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    {
      headers: {
        "Accept-Language": lang,
      },
    },
  );

  if (response.data.isSuccessful && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to fetch data");
}
