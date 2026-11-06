import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import ExperienceTabs from "@/components/ExperienceTabs";
import { PageIntro } from "@/components/ui";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/experiencia">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return buildMetadata(lang, "experience", "/experiencia");
}

export default async function ExperiencePage({ params }: PageProps<"/[lang]/experiencia">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).experience;

  return (
    <PageShell lang={lang} active="experience" className="flex flex-col gap-10 px-4 py-8 sm:px-[50px] sm:pt-11 sm:pb-[30px] lg:flex-row lg:flex-wrap lg:gap-[50px]">
      <PageIntro
        eyebrow={t.eyebrow}
        title={t.title}
        eyebrowClassName="text-lg"
        className="min-w-0 lg:min-w-[280px] lg:flex-[0_1_340px] lg:self-center"
      >
        <p className="mt-6 mb-0 text-[17px] leading-[1.6]">{t.intro}</p>
        <p className="mt-[22px] mb-0 font-hand text-2xl leading-[1.15]" aria-hidden="true">
          {t.hint}
        </p>
      </PageIntro>
      <ExperienceTabs t={t} />
    </PageShell>
  );
}
