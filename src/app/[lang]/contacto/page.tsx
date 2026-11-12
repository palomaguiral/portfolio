import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import CopyEmail from "@/components/CopyEmail";
import { PageIntro } from "@/components/ui";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { contact } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contacto">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return buildMetadata(lang, "contact", "/contacto");
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contacto">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.contact;

  const rowLabel = "text-[13px] font-semibold tracking-[0.16em] uppercase";
  const row =
    "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-cream/35 px-3.5 py-[18px] text-cream no-underline transition-[padding,background-color] duration-300 ease-soft hover:bg-cream/8 hover:pl-[30px] hover:text-white";
  const big = "font-serif text-[22px] font-semibold break-all sm:text-[28px] sm:break-normal";

  return (
    <PageShell lang={lang} active="contact" className="flex px-4 py-8 sm:px-[50px] sm:pt-11 sm:pb-[30px]">
      <div className="flex flex-[1_1_100%] flex-col flex-wrap items-stretch justify-center gap-10 lg:flex-row lg:items-center lg:gap-[70px] lg:self-center">
        <PageIntro eyebrow={t.eyebrow} title={t.title} className="min-w-0 lg:min-w-[280px] lg:flex-[0_1_340px]">
          <p className="mt-6 mb-0 text-[17px] leading-[1.6]">{t.intro}</p>
        </PageIntro>

        <section className="min-w-0 animate-rise lg:flex-[0_1_680px]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-y border-cream/35 px-3.5 py-[18px]">
            <span className={`${rowLabel} inline-flex items-center gap-2.5 self-center`}>
              <Image src="/contact/gmail.png" alt="" width={85} height={64} className="h-[22px] w-auto" />
              {t.email}
            </span>
            <span className="flex flex-wrap items-baseline gap-3">
              <a href={`mailto:${contact.email}`} className="font-serif text-xl font-semibold text-cream no-underline hover:text-white sm:text-2xl">
                {contact.email}
              </a>
              <CopyEmail email={contact.email} copy={t.copy} copied={t.copied} label={t.copyLabel} />
            </span>
          </div>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={row}>
            <span className={`${rowLabel} inline-flex items-center gap-2.5 self-center`}>
              <Image src="/contact/linkedin.png" alt="" width={64} height={64} className="h-[22px] w-auto" />
              {t.linkedin}
            </span>
            <span className={big}>
              {contact.linkedinHandle} <span aria-hidden="true">↗</span>
            </span>
            <span className="sr-only">{dict.common.newTab}</span>
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className={row}>
            <span className={`${rowLabel} inline-flex items-center gap-2.5 self-center`}>
              <Image src="/contact/github.png" alt="" width={66} height={64} className="h-[22px] w-auto" />
              {t.github}
            </span>
            <span className={big}>
              {contact.githubHandle} <span aria-hidden="true">↗</span>
            </span>
            <span className="sr-only">{dict.common.newTab}</span>
          </a>
          <a href={contact.cv} download className={row}>
            <span className={rowLabel}>{t.cv}</span>
            <span className={big}>
              {dict.common.downloadCv} <span aria-hidden="true">↓</span>
            </span>
          </a>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-3.5 pt-[22px] text-[15px]">
            <Image src="/edu/globe.png" alt="" width={30} height={25} className="h-[25px] w-auto" />
            <span>
              <span className="font-hand text-[22px]">{t.locationLabel}</span> {dict.common.location}
            </span>
            <span className="rounded-full border border-cream/60 px-3 py-0.5 text-[13px] font-medium">{t.relocation}</span>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
