import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { PageIntro } from "@/components/ui";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { degreeRotations } from "@/lib/content";

export async function generateMetadata({ params }: PageProps<"/[lang]/educacion">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return buildMetadata(lang, "education", "/educacion");
}

export default async function EducationPage({ params }: PageProps<"/[lang]/educacion">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).education;

  return (
    <PageShell lang={lang} active="education" className="flex flex-col gap-10 px-4 py-8 sm:px-[50px] sm:pt-11 sm:pb-[30px] lg:flex-row lg:flex-wrap lg:gap-[50px]">
      <PageIntro eyebrow={t.eyebrow} title={t.title} className="min-w-0 lg:min-w-[280px] lg:flex-[0_1_340px] lg:self-center">
        <p className="mt-6 mb-0 text-[17px] leading-[1.6]">{t.intro}</p>
      </PageIntro>

      <section className="flex min-w-0 flex-col gap-[34px] lg:flex-[1_1_760px]">
        <div className="grid grid-cols-1 gap-[26px] pt-2.5 md:grid-cols-3">
          {t.degrees.map((d, i) => (
            <article
              key={d.school + d.date}
              className="animate-rise bg-paper p-3.5 text-ink shadow-[0_24px_40px_rgba(30,2,4,0.35)] rotate-(--rot) transition-[translate,rotate,box-shadow] duration-[400ms] ease-soft hover:-translate-y-3 hover:rotate-0 hover:shadow-[0_40px_60px_rgba(30,2,4,0.45)]"
              style={{ animationDelay: `${i * 0.08}s`, "--rot": `${degreeRotations[i]}deg` } as CSSProperties}
            >
              <div className="relative box-border flex h-full flex-col gap-2.5 border-[1.5px] border-[#b88a7e] px-6 pt-7 pb-10 outline-4 -outline-offset-[10px] outline-[#d9bfb4] outline-double">
                <p className="m-0 text-[11px] font-semibold tracking-[0.2em] uppercase text-panel">{d.date}</p>
                <h2 className="m-0 font-serif text-[28px] leading-[1.05] font-semibold lg:text-[30px]">{d.title}</h2>
                <p className="m-0 text-[15px] font-medium">{d.school}</p>
                <p className="mt-2 mb-0 text-sm leading-normal text-ink-soft">{d.note}</p>
                <span
                  aria-hidden="true"
                  className="absolute right-[18px] -bottom-[22px] flex size-[70px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#C42A2F,#7A0D12_70%)] font-serif text-[17px] font-semibold text-cream shadow-[0_6px_12px_rgba(30,2,4,0.4)]"
                >
                  {d.seal}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="animate-rise" style={{ animationDelay: "0.25s" }}>
          <h2 className="m-0 mb-1.5 text-[13px] font-semibold tracking-[0.18em] uppercase">{t.certsTitle}</h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-x-7 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {t.certs.map((c) => (
              <li
                key={c.name}
                className="flex flex-col gap-1 border-t border-cream/30 py-3.5 transition-[padding] duration-300 hover:pl-2.5"
              >
                <span className="text-base leading-[1.35] font-medium">{c.name}</span>
                <span className="text-sm text-tabtext">{c.org}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
