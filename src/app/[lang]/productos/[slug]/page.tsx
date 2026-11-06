import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { Chip } from "@/components/ui";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { products, productSlugs, type ProductSlug } from "@/lib/content";

export function generateStaticParams() {
  return locales.flatMap((lang) => productSlugs.map((slug) => ({ lang, slug })));
}

function isSlug(s: string): s is ProductSlug {
  return (productSlugs as readonly string[]).includes(s);
}

export async function generateMetadata({ params }: PageProps<"/[lang]/productos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) return {};
  const it = getDictionary(lang).products.items[slug];
  return buildMetadata(lang, "products", `/productos/${slug}`, {
    title: `${it.name} · Paloma Guiral`,
    description: it.line,
  });
}

export default async function ProductPage({ params }: PageProps<"/[lang]/productos/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) notFound();
  const dict = getDictionary(lang);
  const t = dict.products;
  const it = t.items[slug];
  const p = products[slug];

  const label = "m-0 mt-1.5 mb-2.5 text-[13px] font-semibold tracking-[0.16em] uppercase text-panel";
  const num = "font-serif text-[30px] font-semibold text-panel";
  const row = "grid grid-cols-[44px_1fr] gap-3 py-[22px] sm:grid-cols-[70px_1fr] sm:gap-4";

  return (
    <PageShell lang={lang} active="products" className="flex flex-col gap-10 px-4 py-8 sm:px-[50px] sm:pt-11 sm:pb-[30px] lg:flex-row lg:flex-wrap lg:gap-[50px]">
      <section className="flex min-w-0 flex-col lg:min-w-[280px] lg:flex-[0_1_340px]">
        <Link href={`/${lang}/productos`} className="min-h-8 self-start text-sm font-semibold text-cream no-underline hover:text-white">
          {t.backToFolder}
        </Link>
        <div key={slug} className="animate-rise-sm">
          <p className="mt-[34px] mb-0 text-[13px] font-semibold tracking-[0.2em] uppercase">{it.kind}</p>
          <p className="mt-2.5 mb-0">
            <span className="inline-block rounded-full border border-cream/60 px-3 py-[5px] text-[13px] font-medium">{it.status}</span>
          </p>
          <h1 className="mt-2.5 mb-0 font-serif text-[64px] leading-[0.9] font-medium tracking-[-0.03em] lg:text-[92px]">{it.name}</h1>
          <p className="mt-5 mb-0 text-lg leading-normal">{it.line}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.links.map((url, i) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-cream px-[18px] py-3 text-sm font-semibold text-outer no-underline hover:bg-white"
              >
                {it.links[i]} <span aria-hidden="true">↗</span>
                <span className="sr-only"> {dict.common.newTab}</span>
              </a>
            ))}
          </div>
          <p aria-hidden="true" className="mt-[26px] mb-0 hidden font-hand text-2xl lg:block">
            {t.storyHint}
          </p>
        </div>
      </section>

      <div className="flex min-w-0 flex-col lg:flex-[1_1_760px]">
        <nav aria-label={t.switchLabel}>
          <ul className="m-0 flex list-none items-end gap-1 p-0 pt-2 sm:gap-1.5 sm:pl-3.5">
            {productSlugs.map((s, i) => {
              const sel = s === slug;
              return (
                <li key={s} className="min-w-0 flex-1 sm:flex-none">
                  <Link
                    href={`/${lang}/productos/${s}`}
                    aria-current={sel ? "page" : undefined}
                    scroll={false}
                    className={`flex items-center gap-3 rounded-t-2xl px-3 pb-3.5 text-left sm:pr-6 sm:pl-[22px] no-underline transition-transform duration-[250ms] ease-soft hover:-translate-y-[5px] sm:min-w-[150px] ${
                      sel ? "bg-cream pt-4 text-ink" : "bg-deep pt-3 text-cream"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold tracking-[0.12em] uppercase opacity-80 sm:text-[11px] sm:tracking-[0.16em]">
                        {t.productN} 0{i + 1}
                      </span>
                      <span className="block truncate font-serif text-xl leading-[1.05] font-semibold sm:text-2xl">{t.items[s].name}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <article
          key={slug}
          tabIndex={0}
          aria-label={it.name}
          className="box-border min-w-0 flex-[1_1_auto] animate-rise-sm rounded-[0_24px_24px_24px] bg-cream px-5 pt-2.5 pb-5 text-ink shadow-[0_30px_60px_rgba(30,2,4,0.35)] sm:px-9 lg:h-[650px] lg:overflow-y-auto"
        >
          <section className={row}>
            <span aria-hidden="true" className={num}>01</span>
            <div>
              <h2 className={label}>{t.blocks.spark}</h2>
              <p className="m-0 text-base leading-[1.6]">{it.spark}</p>
            </div>
          </section>
          <section className={`${row} border-t border-line`}>
            <span aria-hidden="true" className={num}>02</span>
            <div>
              <h2 className={label}>{t.blocks.problem}</h2>
              <p className="m-0 text-base leading-[1.6]">{it.problem}</p>
            </div>
          </section>
          <section className={`${row} border-t border-line`}>
            <span aria-hidden="true" className={num}>03</span>
            <div className="min-w-0">
              <h2 className={label}>{t.blocks.shots}</h2>
              <div className="mt-1 flex flex-wrap gap-4">
                {p.shots.map((sh, i) => (
                  <div
                    key={sh.src}
                    className="relative box-border max-w-full shrink-0 self-center overflow-hidden shadow-[0_14px_28px_rgba(62,7,10,0.18)] rotate-(--rot) transition-[translate,rotate] duration-[350ms] ease-soft hover:-translate-y-2 hover:rotate-0"
                    style={
                      {
                        width: sh.w,
                        aspectRatio: `${sh.w} / ${sh.h}`,
                        borderRadius: sh.radius,
                        border: sh.border,
                        background: sh.bg,
                        "--rot": `${sh.rot}deg`,
                      } as CSSProperties
                    }
                  >
                    <Image
                      src={sh.src}
                      alt={it.shotAlts[i]}
                      fill
                      sizes={`${sh.w}px`}
                      className={sh.fit === "cover" ? "object-cover object-top" : "object-contain"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className={`${row} border-t border-line`}>
            <span aria-hidden="true" className={num}>04</span>
            <div>
              <h2 className={label}>{t.blocks.role}</h2>
              <h3 className="m-0 mb-2 text-[13px] font-semibold">{t.whatIDid}</h3>
              <div className="flex flex-wrap gap-1.5">
                {it.role.map((r) => (
                  <Chip key={r} variant="solid">
                    {r}
                  </Chip>
                ))}
              </div>
              <h3 className="mt-4 mb-2 text-[13px] font-semibold">{t.backend}</h3>
              <div className="flex flex-wrap gap-1.5">
                {it.back.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
              <h3 className="mt-4 mb-2 text-[13px] font-semibold">
                {t.frontend} <span className="font-normal text-muted">{t.vibeNote}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {it.front.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          </section>
        </article>
      </div>
    </PageShell>
  );
}
