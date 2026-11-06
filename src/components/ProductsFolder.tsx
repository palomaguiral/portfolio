"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { products, productSlugs } from "@/lib/content";

type Props = { t: Dictionary["products"]; lang: Locale };

// Positions of the three cards peeking out of the closed folder (in % of a 600×520 box).
const peek = [
  { left: 10, top: 7.69, r: -8 },
  { left: 34.17, top: 1.92, r: 2 },
  { left: 58.33, top: 8.85, r: 9 },
];

export default function ProductsFolder({ t, lang }: Props) {
  const [open, setOpen] = useState(false);
  const firstCard = useRef<HTMLAnchorElement>(null);
  const folderBtn = useRef<HTMLButtonElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    if (!moved.current) return;
    if (open) firstCard.current?.focus();
    else folderBtn.current?.focus();
  }, [open]);

  const toggle = (v: boolean) => {
    moved.current = true;
    setOpen(v);
  };

  return (
    <section className="relative flex min-h-[420px] items-center justify-center pt-10 lg:min-h-[560px] lg:flex-[1_1_640px]">
      <p aria-hidden="true" className="absolute top-0 m-0 font-hand text-2xl lg:right-[348px]">
        {open ? t.hintOpen : t.hintClosed}
      </p>

      {!open ? (
        <button
          ref={folderBtn}
          type="button"
          onClick={() => toggle(true)}
          aria-label={t.openFolder}
          className="folder relative aspect-[600/520] w-[min(600px,100%)] cursor-pointer border-0 bg-transparent p-0 text-inherit"
        >
          <span aria-hidden="true" className="absolute top-[11.5%] left-0 h-[11.5%] w-[36.67%] rounded-t-[18px] bg-folder" />
          <span aria-hidden="true" className="absolute top-[18.46%] right-0 bottom-0 left-0 rounded-[0_22px_22px_22px] bg-folder" />
          {productSlugs.map((slug, i) => {
            const p = products[slug];
            const pos = peek[i];
            return (
              <span
                key={slug}
                aria-hidden="true"
                className="folder-card absolute box-border flex h-[48.08%] w-[31.67%] flex-col rounded-xl bg-cream p-[2%] text-left text-[#4a080b] shadow-[0_16px_30px_rgba(30,2,4,0.35)]"
                style={{ left: `${pos.left}%`, top: `${pos.top}%`, "--r": `${pos.r}deg` } as CSSProperties}
              >
                <span className="relative min-h-0 flex-1 overflow-hidden rounded-md" style={{ background: p.folder.bg }}>
                  <Image
                    src={p.folder.src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 30vw, 170px"
                    className={p.folder.fit === "cover" ? "object-cover" : "object-contain"}
                    style={{ objectPosition: p.folder.pos }}
                  />
                </span>
                <span className="mt-2 font-serif text-[clamp(16px,4vw,24px)] font-semibold">{t.items[slug].name}</span>
              </span>
            );
          })}
          <span
            aria-hidden="true"
            className="absolute top-[42.3%] -right-2.5 bottom-0 -left-2.5 box-border flex flex-col justify-end rounded-[20px] bg-deep p-[5.5%] text-left shadow-[0_-10px_30px_rgba(30,2,4,0.3)]"
          >
            <span className="font-serif text-[clamp(28px,7.5vw,46px)] leading-none font-semibold text-cream">{t.folderCount}</span>
            <span className="mt-2 text-[15px] text-tabtext">{t.folderSub}</span>
          </span>
        </button>
      ) : (
        <div className="flex w-full flex-col gap-[18px]">
          <ul className="m-0 grid list-none grid-cols-1 gap-[18px] p-0 sm:grid-cols-3">
            {productSlugs.map((slug, i) => {
              const p = products[slug];
              const it = t.items[slug];
              return (
                <li key={slug} className="flex">
                  <Link
                    ref={i === 0 ? firstCard : undefined}
                    href={`/${lang}/productos/${slug}`}
                    className="folder-open-card flex w-full flex-col gap-3 rounded-[18px] bg-cream p-3.5 text-[#4a080b] no-underline"
                    style={{ "--r": `${p.card.rot}deg`, animationDelay: `${i * 0.08}s` } as CSSProperties}
                  >
                    <span className="relative block h-[200px] w-full overflow-hidden rounded-[10px] lg:h-[260px]" style={{ background: p.card.bg }}>
                      <Image
                        src={p.card.src}
                        alt={it.cardAlt}
                        fill
                        sizes="(max-width: 640px) 90vw, 30vw"
                        className={p.card.fit === "cover" ? "object-cover" : "object-contain"}
                        style={{ objectPosition: p.card.pos }}
                      />
                    </span>
                    <span className="text-xs font-semibold tracking-[0.14em] uppercase text-panel">{it.cardKind}</span>
                    <span className="font-serif text-4xl leading-none font-semibold">{it.name}</span>
                    <span className="text-[15px] leading-normal">{it.cardLine}</span>
                    <span className="mt-auto text-sm font-semibold">{t.viewProduct}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => toggle(false)}
            className="min-h-11 cursor-pointer self-start rounded-full border border-cream/60 bg-transparent px-5 py-3 font-semibold text-cream hover:bg-cream/10"
          >
            {t.closeFolder}
          </button>
        </div>
      )}
    </section>
  );
}
