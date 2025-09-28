"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { useCurrentTheme } from "@/hooks/use-current-theme";

export default function Page() {
  const currentTheme = useCurrentTheme();
  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[16vh] item-center mx-auto">
        <SignIn
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
