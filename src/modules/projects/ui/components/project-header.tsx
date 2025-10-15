import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDownIcon, ChevronLeftIcon, SunMoonIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface Props {
  projectId: string;
}

const ProjectHeader = ({ projectId }: Props) => {
  const trpc = useTRPC();
  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  );

  const { setTheme, theme } = useTheme();
  const t = useTranslations("project.header");

  return (
    <header className="p-2 flex justify-between items-center border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="focus-visible:ring-0 hover:bg-transparent hover:opacity-75 transition-opacity pl-2!"
            >
              <Image src="/logo.svg" alt="Arab-Vibe" width={18} height={18} />
              <span className="text-sm font-medium">{project.name}</span>
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            <DropdownMenuItem asChild>
              <Link href={"/"}>
                <ChevronLeftIcon className="rtl:scale-x-[-1] rtl:order-2" />
                <span className="rtl:order-1"> {t("go-to-dashboard")} </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <div className="flex items-center gap-2 rtl:order-1 rtl:[&~.lucide.lucide-chevron-right]:mr-auto rtl:[&~.lucide.lucide-chevron-right]:ml-0 rtl:[&~.lucide.lucide-chevron-right]:scale-[-1]">
                  <SunMoonIcon className="size-4 text-muted-foreground" />
                  <span> {t("appearance")} </span>
                </div>  
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme}
                  >
                    <DropdownMenuRadioItem value="light">
                      <span>{t("light")}</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <span>{t("dark")}</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <span>{t("system")}</span>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
    </header>
  );
};

export default ProjectHeader;
