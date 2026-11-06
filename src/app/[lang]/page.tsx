import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import HomeAreas from "@/components/home/HomeAreas";
import SummaryModal from "@/components/home/SummaryModal";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { contact } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return buildMetadata(lang, "home", "");
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.home;

  return (
    <PageShell
      lang={lang}
      active="home"
      className="flex flex-col flex-wrap gap-10 px-4 pt-10 pb-8 sm:px-10 lg:flex-row lg:pb-24"
    >
      {/* Badge on a lanyard + polaroids */}
      <div className="relative mx-auto h-[690px] w-[300px] shrink-0 sm:w-[330px] lg:mx-0 lg:-mt-10 lg:h-auto lg:min-h-[600px] lg:flex-[0_0_330px] lg:self-stretch">
        <div
          aria-hidden="true"
          className="absolute top-[449px] left-[160px] box-border h-[172px] w-[140px] rotate-[8deg] bg-cream px-2 pt-2 pb-[26px] shadow-[0_18px_34px_rgba(40,0,0,0.4)] transition-transform duration-[400ms] ease-soft hover:-translate-y-2 hover:rotate-0 sm:left-[189px]"
        >
          <div className="relative size-full">
            <Image src="/paloma_ruta66.jpg" alt="" fill sizes="124px" className="object-cover object-[70%_35%]" />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute top-[516px] left-[10px] box-border h-[152px] w-[124px] -rotate-[5deg] bg-cream px-2 pt-2 pb-6 shadow-[0_18px_34px_rgba(40,0,0,0.4)] transition-transform duration-[400ms] ease-soft hover:-translate-y-2 hover:rotate-0 sm:left-[26px]"
        >
          <div className="relative size-full">
            <Image src="/paloma_shanghai.jpg" alt="" fill sizes="108px" className="object-cover object-[62%_55%]" />
          </div>
        </div>

        <div className="badge-swing absolute top-0 left-[25px] z-[2] flex w-[250px] flex-col items-center sm:left-0">
          <span aria-hidden="true" className="box-border block h-16 w-[46px] rounded-b-md border-x-[7px] border-[#1e1a1a]" />
          <span
            aria-hidden="true"
            className="-mt-1.5 block h-10 w-[30px] rounded-[5px] bg-[linear-gradient(90deg,#6E6A66,#CFCAC4_45%,#7A7570)] shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
          />
          <div className="relative -mt-2.5 box-border w-[250px] rounded-2xl border-[1.5px] border-white/55 bg-white/22 px-3 pt-[30px] pb-3.5 shadow-[0_30px_50px_rgba(30,2,4,0.45),inset_0_1px_0_rgba(255,255,255,0.6)]">
            <span
              aria-hidden="true"
              className="absolute top-2.5 left-1/2 -ml-[23px] h-[9px] w-[46px] rounded-md bg-panel shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
            />
            <div className="bg-[#fbf7f1] px-4 pt-4 pb-[18px] text-[#2a1a1a]">
              <p className="m-0 text-center text-[10px] tracking-[0.26em] text-[#5f5552] uppercase">{t.portfolio}</p>
              <div className="relative mt-3 h-[190px] w-full">
                <Image
                  src="/paloma_retrato.jpg"
                  alt={t.portraitAlt}
                  fill
                  priority
                  sizes="194px"
                  className="object-cover object-[50%_28%]"
                />
              </div>
              <div className="mt-3 border-b-[1.5px] border-dashed border-[#2a1a1a] pb-0.5">
                <span className="text-[10px] font-semibold tracking-[0.08em]">{t.nameLabel}</span>
                <h1 className="m-0 font-hand text-[25px] leading-[1.1] font-semibold text-[#2a1a1a]">{t.name}</h1>
              </div>
              <div className="mt-2 border-b-[1.5px] border-dashed border-[#2a1a1a] pb-0.5">
                <span className="text-[10px] font-semibold tracking-[0.08em]">{t.profileLabel}</span>
                <p className="m-0 font-hand text-[23px] leading-[1.1] text-panel">{t.profile}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intro + 1-minute summary */}
      <section className="flex min-w-0 flex-col lg:min-w-[300px] lg:flex-[0_1_360px]">
        <p className="mt-0 mb-0 text-[17px] leading-[1.6] sm:text-[19px] lg:mt-[22px]">{t.intro1}</p>
        <p className="mt-4 mb-0 text-[17px] leading-[1.6] sm:text-[19px]">
          {t.intro2}{" "}
          <span aria-hidden="true" className="font-serif text-[19px] font-semibold italic">
            →
          </span>
        </p>
        <div className="relative mt-[34px] flex flex-col rounded-[20px] border-[1.5px] border-cream/45 bg-[#6e0d13] px-5 pt-[18px] pb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_14px_30px_rgba(40,0,4,0.25)]">
          <p className="m-0 max-w-[250px] font-hand text-[23px] leading-[1.15] text-cream">{t.summaryNote}</p>
          <svg aria-hidden="true" viewBox="0 0 90 70" className="absolute right-3.5 bottom-[18px] h-[66px] w-[86px]">
            <path d="M78 6 C 88 38, 64 58, 16 56" fill="none" stroke="#F4E7D7" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M27 47 L15 56 L28 64" fill="none" stroke="#F4E7D7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <SummaryModal t={dict.summary} common={dict.common} buttonLabel={t.summaryButton} />
        </div>
      </section>

      <HomeAreas areas={t.areas} label={t.areasLabel} note={t.areasNote} contributes={t.contributes} />

      <footer className="flex flex-wrap items-center gap-x-[26px] gap-y-2.5 border-t border-cream/25 pt-3.5 text-sm lg:absolute lg:right-10 lg:bottom-[22px] lg:left-10">
        <a href={`mailto:${contact.email}`} className="inline-flex min-h-6 items-center text-cream no-underline hover:text-white">
          {contact.email}
        </a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center text-cream no-underline hover:text-white">
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center text-cream no-underline hover:text-white">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <a href={contact.cv} download className="inline-flex min-h-6 items-center text-cream no-underline hover:text-white">
          {dict.common.downloadCv} <span aria-hidden="true">↓</span>
        </a>
        <span className="text-tabtext sm:ml-auto">
          {dict.common.location} · {t.footerLangs}
        </span>
      </footer>
    </PageShell>
  );
}
