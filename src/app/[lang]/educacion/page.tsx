import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { PageIntro } from "@/components/ui";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { degreeRotations, degreeSeals, educationIcons, languageFlags } from "@/lib/content";
import ExchangeMap from "@/components/ExchangeMap";
import ExchangeArrows from "@/components/ExchangeArrows";

export async function generateMetadata({ params }: PageProps<"/[lang]/educacion">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return buildMetadata(lang, "education", "/educacion");
}

function SectionTitle({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <h2 className="m-0 flex items-center gap-3 text-[13px] font-semibold tracking-[0.18em] uppercase">
      <Image src={icon} alt="" width={34} height={34} className="size-[34px] object-contain" />
      {children}
    </h2>
  );
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

      <section className="flex min-w-0 flex-col gap-6 lg:flex-[1_1_760px]">
        <div className="animate-rise">
          <SectionTitle icon={educationIcons.degrees}>{t.degreesTitle}</SectionTitle>
          <div className="relative grid grid-cols-1 gap-[26px] pt-5 md:grid-cols-3">
            {t.degrees.map((d, i) => (
              <article
                key={d.school + d.date}
                className="animate-rise bg-paper p-3.5 text-ink shadow-[0_24px_40px_rgba(30,2,4,0.35)] rotate-(--rot) transition-[translate,rotate,box-shadow] duration-[400ms] ease-soft hover:-translate-y-3 hover:rotate-0 hover:shadow-[0_40px_60px_rgba(30,2,4,0.45)]"
                style={{ animationDelay: `${i * 0.08}s`, "--rot": `${degreeRotations[i]}deg` } as CSSProperties}
              >
                <div className="relative box-border flex h-full flex-col gap-2.5 border-[1.5px] border-[#b88a7e] px-6 pt-7 pb-10 outline-4 -outline-offset-[10px] outline-[#d9bfb4] outline-double">
                  <p className="m-0 text-[11px] font-semibold tracking-[0.2em] uppercase text-panel">{d.date}</p>
                  <h3 className="m-0 font-serif text-[28px] leading-[1.05] font-semibold lg:text-[30px]">{d.title}</h3>
                  <p className="m-0 text-[15px] font-medium">
                    {d.school.split(" · ").map((s, j) => (
                      <span key={s} className="block">
                        {j > 0 ? "+ " : null}
                        {s}
                      </span>
                    ))}
                  </p>
                  <p className="mt-2 mb-0 text-sm leading-normal text-ink-soft">{d.note}</p>
                  {degreeSeals[i]?.map((seal) => (
                    <span
                      key={seal.id}
                      data-seal={seal.id}
                      className={`absolute right-[18px] ${seal.corner === "top" ? "-top-[22px]" : "-bottom-[22px]"} size-[70px] overflow-hidden rounded-full bg-paper shadow-[0_6px_12px_rgba(30,2,4,0.4)] ring-2 ring-paper`}
                    >
                      <Image src={seal.src} alt={seal.alt} fill sizes="70px" className="object-cover" />
                    </span>
                  ))}
                </div>
              </article>
            ))}
            <div className="animate-rise relative h-[300px] md:h-auto" style={{ animationDelay: `${t.degrees.length * 0.08}s` }}>
              <ExchangeMap
                from={t.exchangeMap.from}
                to={t.exchangeMap.to}
                label={t.exchangeMap.label}
                className="absolute inset-x-0 -top-8 h-[calc(100%+4rem)] w-full overflow-visible"
              />
            </div>
            <ExchangeArrows />
          </div>
        </div>

        <div className="animate-rise" style={{ animationDelay: "0.25s" }}>
          <SectionTitle icon={educationIcons.certs}>{t.certsTitle}</SectionTitle>
          <div className="h-2" />
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

        <div className="animate-rise flex flex-wrap items-center gap-x-10 gap-y-2 border-t border-cream/30 pt-3.5" style={{ animationDelay: "0.32s" }}>
          <SectionTitle icon={educationIcons.languages}>{t.languagesTitle}</SectionTitle>
          <ul className="m-0 flex list-none flex-wrap gap-x-10 gap-y-1 p-0">
            {t.languages.map((l, i) => (
              <li key={l.name} className="flex items-center gap-2 text-base font-medium">
                {languageFlags[i] ? (
                  <Image
                    src={languageFlags[i].src}
                    alt=""
                    width={languageFlags[i].w}
                    height={48}
                    className="h-4 w-auto rounded-[2px] shadow-[0_0_0_1px_rgba(244,231,215,0.35)]"
                  />
                ) : null}
                {l.name} <span className="text-sm font-normal text-tabtext">· {l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
