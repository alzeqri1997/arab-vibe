"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { useCurrentTheme } from "@/hooks/use-current-theme";
import { useParams } from "next/navigation";

export default function Page() {
  const currentTheme = useCurrentTheme();
  const { lang } = useParams();

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[16vh] item-center mx-auto">
        <SignUp
          afterSignOutUrl={`/${lang}`}
          fallbackRedirectUrl={`/${lang}`}
          appearance={{
            baseTheme: currentTheme === "dark" ? dark : undefined,
            elements: {
              cardBox: "border! shadow-none! rounded-lg!",
            },
          }}
        />
      </section>
    </div>
  );
}
