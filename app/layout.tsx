import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import I18nProvider from "@/providers/I18nProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value || "en";
  const title =
    language === "ar" ? "متجر التجارة الإلكترونية" : "E-commerce Store";
  const description =
    language === "ar"
      ? "متجرك الشامل للأثاث وديكور المنزل"
      : "Your one-stop shop for furniture and home decor";
  return {
    title: {
      template: `%s | ${title}`,
      absolute: title,
    },
    description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="font-gilroy scroll-smooth">
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <Toaster />
            </ReactQueryProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
