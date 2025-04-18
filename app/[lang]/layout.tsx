import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import QueryProvider from "@/components/tools/queryProvider";
import AuthProvider from "@/lib/provider";
import { Locale, i18n } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import LoadingScreen from "@/components/admin/suspense/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bright Path",
  description: "Learn, Teach, and Grow with Bright Path",
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const lang: Locale = params.lang;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            <Suspense fallback={<LoadingScreen />}>
              {children}
              <Toaster />
           </Suspense>
          </QueryProvider>
      </AuthProvider>
    </body>
    </html >
  );
}
