import ProjectForm from "@/modules/home/ui/components/project-form";
import ProjectsList from "@/modules/home/ui/components/projects-list";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home")
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="Arab Vibe"
            width={50}
            height={50}
            className="hidden sm:block"
          />
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          {t('heading')}
        </h1>
        <p className="text-lg md:text-muted-foreground text-center">
          {t('sub-heading')}
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
      <ProjectsList />
    </div>
  );
}
