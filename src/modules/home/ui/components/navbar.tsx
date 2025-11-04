"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

import UserControl from "@/components/user-control";
import { useScroll } from "@/hooks/use-scroll";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import LanguageSwitchDropdown from "@/components/lang-switch-dropdown";

const Navbar = () => {
  const isScrolled = useScroll();
  const t = useTranslations("home");
  const { locale } = useParams() as { locale: string };

  return (
    <nav
      className={cn(
        "p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent",
        isScrolled && "bg-background border-border"
      )}
    >
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link locale={locale} href={"/"} className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="Arab" width={24} height={24} />
          <span className="font-semibold text-lg">Arab Vibe</span>
        </Link>
        <div className="flex items-center gap-2">
          <div>
            <LanguageSwitchDropdown />
          </div>
          <div className="border-l border-border h-6 mx-4" />
          <div>
            <SignedOut>
              <div className="flex gap-2">
                <Button asChild variant={"outline"} size={"sm"}>
                  <Link locale={locale} href={"/sign-up"}>
                    {t("navbar.sign-up")}
                  </Link>
                </Button>
                <Button asChild size={"sm"}>
                  <Link locale={locale} href={"/sign-in"}>
                    {t("navbar.sign-in")}
                  </Link>
                </Button>
              </div>
            </SignedOut>
            <SignedIn>
              <UserControl showName />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
