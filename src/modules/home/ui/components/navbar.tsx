"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

import UserControl from "@/components/user-control";
import { useScroll } from "@/hooks/use-scroll";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Languages } from "lucide-react";

const navbar = () => {
  const isScrolled = useScroll();
  const t = useTranslations("home");
  const { lang } = useParams();

  return (
    <nav
      className={cn(
        "p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent",
        isScrolled && "bg-background border-border"
      )}
    >
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="Arab" width={24} height={24} />
          <span className="font-semibold text-lg">Arab Vibe</span>
        </Link>
        <div className="flex items-center gap-2">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Languages />
                  <span>{lang === "ar" ? "العربية" : "English"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link className="w-full" href={"/ar" }>العربية</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="w-full" href={"/en" }>English</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="border-l border-border h-6 mx-4" />
          <div>
            <SignedOut>
              <div className="flex gap-2">
                <SignUpButton>
                  <Button variant={"outline"} size={"sm"}>
                    {t("navbar.sign-up")}
                  </Button>
                </SignUpButton>
                <SignInButton>
                  <Button size={"sm"}>{t("navbar.sign-in")}</Button>
                </SignInButton>
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

export default navbar;
