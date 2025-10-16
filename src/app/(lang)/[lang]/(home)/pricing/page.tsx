"use client";

import Image from "next/image";
import { Fragment } from "react";
import { PricingTable } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTranslations } from "next-intl";
import { AlertCircleIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCurrentTheme } from "@/hooks/use-current-theme";
import { Button } from "@/components/ui/button";

const Page = () => {
  const currentTheme = useCurrentTheme();
  const t = useTranslations("pricing");

  return (
    <Fragment>
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
                pricingTableCard: "border! shadow-none! rounded-lg!",
              },
            }}
          />
        </section>
      </div>
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
          <AlertDialogHeader className="grid rtl:text-right has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 [&>svg]:size-5 [&>svg]:translate-y-0.10 [&>svg]:text-current">
            <AlertCircleIcon className="self-center"/>
            <AlertDialogTitle> {t("note-title")} </AlertDialogTitle>
            <AlertDialogDescription className="col-start-2 text-muted-foreground">
              {t("beta-note")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild >
             <Button size={'sm'} variant={'outline'} >{t("continue")}</Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
};

export default Page;
