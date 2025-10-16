"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ar, enUS } from "date-fns/locale";

const ProjectList = () => {
  const { lang } = useParams();
  const t = useTranslations("home")
  const trpc = useTRPC();
  const { user } = useUser();

  const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());

  if (!user) return null;

  return (
    <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
      <h2 className="text-2xl font-semibold">
        {t('projects.previous-projects')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {projects?.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-sm text-muted-foreground">{t('projects.no-projects-found')}</p>
          </div>
        )}
        {projects?.map((project) => (
          <Button
            key={project.id}
            variant="outline"
            className="font-normal h-auto justify-start w-full text-start p-4"
          >
            <Link href={`${lang}/projects/${project.id}`}>
              <div className="flex flex-1 items-center gap-x-4">
                <Image
                  src="/logo.svg"
                  alt="Arab Vibe"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <div className="flex flex-1 flex-col">
                  <h3 className="truncate font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                      locale: lang === "ar" ? ar : enUS
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
