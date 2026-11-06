import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import AnalysisPicker from "@/components/AnalysisPicker";
import { PageIntro } from "@/components/ui";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/analisis">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return buildMetadata(lang, "analysis", "/analisis");
}

export default async function AnalysisPage({ params }: PageProps<"/[lang]/analisis">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.analysis;

  return (
    <PageShell lang={lang} active="analysis" className="flex flex-col gap-10 px-4 py-8 sm:px-[50px] sm:pt-11 sm:pb-[30px] lg:flex-row lg:flex-wrap lg:gap-[50px]">
      <AnalysisPicker
        t={t}
        newTab={dict.common.newTab}
        intro={
          <PageIntro eyebrow={t.eyebrow} title={t.title} className="flex-none">
            <p className="mt-6 mb-0 text-[17px] leading-[1.6]">{t.intro}</p>
          </PageIntro>
        }
      />
    </PageShell>
  );
}
