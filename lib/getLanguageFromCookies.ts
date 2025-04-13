import { cookies } from "next/headers";
import { cache } from "react";

export const getLanguageFromCookies = cache(async (): Promise<string> => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("language")?.value || "en";
  } catch (error) {
    console.error("Failed to read cookies:", error);
    return "en";
  }
});
