import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { Chip, PageIntro } from "@/components/ui";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/stack">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return buildMetadata(lang, "stack", "/stack");
}

export default async function StackPage({ params }: PageProps<"/[lang]/stack">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).stack;

  return (
    <PageShell lang={lang} active="stack" className="flex flex-col gap-10 px-4 py-8 sm:px-[50px] sm:pt-11 sm:pb-[30px] lg:flex-row lg:flex-wrap lg:gap-[50px]">
      <PageIntro eyebrow={t.eyebrow} title={t.title} className="min-w-0 lg:min-w-[260px] lg:flex-[0_1_300px] lg:self-center">
        <p className="mt-6 mb-0 text-[17px] leading-[1.6]">{t.intro}</p>
      </PageIntro>
      <section
        aria-label={t.sectionLabel}
        className="grid min-w-0 grid-cols-1 gap-3.5 sm:grid-cols-2 lg:max-h-full lg:flex-[1_1_820px] lg:grid-cols-3 lg:self-center"
      >
        {t.groups.map((g, i) => (
          <article
            key={g.title}
            className="animate-rise rounded-[18px] bg-cream px-5 py-[18px] text-ink transition-[transform,box-shadow] duration-300 ease-soft hover:-translate-y-1.5 hover:shadow-[0_26px_44px_rgba(30,2,4,0.4)]"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <h2 className="m-0 mb-3 font-serif text-[22px] leading-[1.1] font-semibold">{g.title}</h2>
            {"note" in g && g.note ? <p className="-mt-1.5 mb-2.5 text-xs text-muted">{g.note}</p> : null}
            <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
              {g.items.map((s) => (
                <li key={s}>
                  <Chip>{s}</Chip>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
