import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { enUS, arSA } from "@clerk/localizations";
import { hasLocale, NextIntlClientProvider } from "next-intl";

import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { notoSansArabic } from "./fonts";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Arab Vibe",
  description: "Your AI-powered assistant for creating nextjs, shadcn projects.",
  icons: {
    icon: "/logo.svg",
  }
};

export async function generateStaticParams() {
  // Return an array of params to statically generate each locale route at build time
  return routing.locales.map((locale) => ({ lang: locale }));
}

interface Props {
  children: Readonly<React.ReactNode>;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(lang)

  return (
    <ClerkProvider
      localization={lang === "ar" ? arSA : enUS}
      appearance={{
        variables: {
          colorPrimary: "#C96342",
        },
      }}
    >
      <TRPCReactProvider>
        <html
          dir={lang === "ar" ? "rtl" : "ltr"}
          lang={lang}
          suppressHydrationWarning
        >
          <body
          className={`${notoSansArabic.className} antialiased`}
        >
            <NextIntlClientProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster />
                {children}
              </ThemeProvider>
            </NextIntlClientProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
