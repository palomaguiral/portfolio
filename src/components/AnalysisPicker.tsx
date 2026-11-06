"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n";
import { analyses } from "@/lib/content";

type Props = { t: Dictionary["analysis"]; newTab: string; intro: ReactNode };

const icons = [
  <svg key="0" aria-hidden="true" viewBox="0 0 108 52" className="h-[52px] w-[108px] flex-none">
    <polyline points="4,46 18,38 30,42 44,24 58,30 72,14 86,20 100,6" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <polyline points="72,14 86,12 100,4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
  </svg>,
  <svg key="1" aria-hidden="true" viewBox="0 0 108 52" className="h-[52px] w-[108px] flex-none">
    <g fill="currentColor">
      <circle cx="14" cy="36" r="3" />
      <circle cx="26" cy="20" r="3" />
      <circle cx="40" cy="30" r="3" />
      <circle cx="52" cy="14" r="3" />
      <circle cx="66" cy="38" r="3" />
      <circle cx="80" cy="22" r="3" />
      <circle cx="92" cy="30" r="3" />
    </g>
    <circle cx="52" cy="14" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>,
  <svg key="2" aria-hidden="true" viewBox="0 0 108 52" className="h-[52px] w-[108px] flex-none">
    <path d="M4 44 C 20 40, 30 30, 44 32 S 70 8, 84 12 S 98 30, 104 26" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <line x1="4" y1="18" x2="104" y2="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" />
  </svg>,
];

export default function AnalysisPicker({ t, newTab, intro }: Props) {
  const [on, setOn] = useState(0);
  const c = t.items[on];
  const cfg = analyses[on];

  return (
    <>
      <div className="flex min-w-0 flex-col gap-[26px] lg:min-w-[300px] lg:flex-[0_1_380px]">
        {intro}
        <div role="group" aria-label={t.listLabel} className="flex flex-col gap-3">
          {t.items.map((it, i) => {
            const sel = i === on;
            return (
              <button
                key={it.name}
                type="button"
                aria-pressed={sel}
                aria-controls="analysis-detail"
                onClick={() => setOn(i)}
                onMouseEnter={() => setOn(i)}
                className={`flex cursor-pointer items-center gap-[18px] rounded-[20px] border-[1.5px] border-cream/50 px-[18px] py-3.5 text-left transition-[transform,background-color] duration-300 ease-soft hover:translate-x-2 ${
                  sel ? "bg-cream text-ink" : "bg-transparent text-cream"
                }`}
              >
                <span className="hidden sm:block">{icons[i]}</span>
                <span>
                  <span className="block font-serif text-[22px] leading-[1.05] font-semibold sm:text-[25px]">{it.name}</span>
                  <span className="mt-1 block text-[13px] opacity-85">{it.sub}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="flex min-w-0 items-center lg:flex-[1_1_700px]">
        <article
          id="analysis-detail"
          key={on}
          aria-live="polite"
          className="box-border flex flex-[1_1_auto] animate-slide-x flex-col gap-[18px] rounded-3xl bg-cream px-5 py-6 text-ink shadow-[0_30px_60px_rgba(30,2,4,0.35)] sm:px-9 sm:py-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-[1_1_auto]">
              <p className="m-0 text-xs font-semibold tracking-[0.18em] uppercase text-panel">{c.tag}</p>
              <h2 className="mt-2 mb-0 font-serif text-[30px] leading-none font-semibold sm:text-4xl">{c.name}</h2>
            </div>
            <div className="flex flex-none flex-col items-start gap-1.5 sm:items-end">
              {cfg.links.map((url, i) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-panel px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap text-cream no-underline hover:bg-[#a3161c]"
                >
                  {c.links[i]} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> {newTab}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="relative box-border h-[150px] w-full rounded-[14px] bg-white p-2">
            <div className="relative size-full">
              <Image src={cfg.fig} alt={c.figAlt} fill sizes="(max-width: 1024px) 90vw, 700px" className="object-contain" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {c.blocks.map((v, i) => (
              <div key={t.blockKeys[i]} className="rounded-2xl bg-white px-[18px] py-4">
                <h3 className="m-0 mb-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-panel">{t.blockKeys[i]}</h3>
                <p className="m-0 text-[15px] leading-normal">{v}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border-[1.5px] border-dashed border-panel px-[18px] py-4">
            <h3 className="m-0 mb-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-panel">{t.bizTitle}</h3>
            <p className="m-0 text-[15px] leading-normal">{c.biz}</p>
          </div>
        </article>
      </section>
    </>
  );
}
