"use client";

import Image from "next/image";
import { PricingTable } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { useCurrentTheme } from "@/hooks/use-current-theme";
import { useTranslations } from "next-intl";

const Page = () => {
  const currentTheme = useCurrentTheme()
  const t = useTranslations("pricing");

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <div className="flex flex-col items-center">
          <Image
            src={"/logo.svg"}
            alt="V ibe"
            width={50}
            height={50}
            className="hidden md:block"
          />
        </div>
        <h1 className="text-1 md:text-center">{t("title")}</h1>
        <p className="text-muted-foreground text-center text-sm md:text-base">
          {t("description")}
        </p>
        <PricingTable
          appearance={{
            baseTheme: currentTheme === "dark" ? dark : undefined,
            elements: {
              pricingTableCard: "border! shadow-none! rounded-lg!"
            }
          }}
        />
      </section>
      
    </div>
  );
};

export default Page;
