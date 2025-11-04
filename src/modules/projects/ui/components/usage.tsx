import { CrownIcon } from "lucide-react";
import { formatDuration, intervalToDuration } from "date-fns";
import { ar, enUS } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";

interface Props {
  points: number;
  msBeforeNext: number; // remaining time to refresh the free points
}

export const Usage = ({ points, msBeforeNext }: Props) => {
  const t = useTranslations("project.usage");
  const { lang } = useParams()
  const { has } = useAuth();
  const hasProAccess = has?.({ plan: "pro" });
  const resetTime = useMemo(() => {
    try {
      return formatDuration(
        intervalToDuration({
          start: new Date(),
          end: new Date(Date.now() + msBeforeNext),
        }),
        { format: ["months", "days", "hours"], locale: lang === "ar" ? ar : enUS}
      );
    } catch (error) {
      console.error("Error formatting duration", error);
      return "unknown";
    }
  }, [msBeforeNext, lang]);
  return (
    <div className="rounded-t-xl bg-background border border-b-0 p-2.5">
      <div className="flex items-center gap-x-2">
        <div>
          <p className="text-sm">
            {points} {hasProAccess ? "" : "free"} {t("credits-remaining")}
          </p>
          <p className="text-xs text-muted-foreground"> {t('rest-in')} {resetTime}</p>
        </div>
        {!hasProAccess && (
          <Button asChild size={"sm"} variant={"tertiary"} className="ml-auto">
            <Link locale={lang as string} href={"/pricing"}>
              <CrownIcon /> {t("upgrade")}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
