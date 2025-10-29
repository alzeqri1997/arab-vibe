import { Languages as LanguagesIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LanguageSwitchDropdown = () => {
  const { lang } = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <LanguagesIcon />
          <span>{lang === "ar" ? "العربية" : "English"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link prefetch={false} replace={true} className="w-full" href={"/ar"}>
            العربية
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link prefetch={false} replace={true} className="w-full" href={"/en"}>
            English
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitchDropdown;
