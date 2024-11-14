import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../globals.css';
import Navbar from '@/components/header';
import Footer from '@/components/footer';
import AboveFooter from "@/components/aboveFooter";
import QueryProvider from "@/components/tools/queryProvider";
import AuthProvider from "@/lib/provider";
import { Suspense } from "react";
import { Locale, i18n } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bright Path",
  description: "learn, teach, and grow with Bright Path",
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
        <AuthProvider>
          <QueryProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar lang={dictionary} />
                {children}
                <Toaster />
                <AboveFooter />
                <Footer />
            </Suspense>
          </QueryProvider>
        </AuthProvider>
  );
}
