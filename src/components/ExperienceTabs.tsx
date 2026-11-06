"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { Chip } from "./ui";
import { useTabKeys } from "./useTabKeys";

type Props = { t: Dictionary["experience"] };

export default function ExperienceTabs({ t }: Props) {
  const [on, setOn] = useState(0);
  const { onKeyDown, setRef } = useTabKeys(t.jobs.length, setOn);
  const c = t.jobs[on];

  return (
    <section className="flex min-w-0 flex-col justify-center lg:flex-[1_1_760px] lg:pb-[30px]">
      <div role="tablist" aria-label={t.tablistLabel} className="scrollbar-none flex items-end gap-1.5 overflow-x-auto pt-2 pl-2.5">
        {t.jobs.map((j, i) => {
          const sel = i === on;
          return (
            <button
              key={j.co}
              ref={setRef(i)}
              role="tab"
              id={`job-tab-${i}`}
              aria-selected={sel}
              aria-controls="job-panel"
              tabIndex={sel ? 0 : -1}
              onClick={() => setOn(i)}
              onMouseEnter={() => setOn(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`shrink-0 cursor-pointer rounded-t-2xl border-0 px-5 pb-4 text-left transition-transform duration-300 ease-soft hover:-translate-y-2 sm:min-w-[190px] sm:px-[26px] ${
                sel ? "bg-cream pt-[18px] text-ink" : "bg-deep pt-3.5 text-cream"
              }`}
            >
              <span className="block font-serif text-xl leading-[1.05] font-semibold sm:text-2xl">{j.co}</span>
              <span className="mt-1 block text-[13px] opacity-85">{j.dates}</span>
            </button>
          );
        })}
      </div>

      <div
        id="job-panel"
        role="tabpanel"
        aria-labelledby={`job-tab-${on}`}
        key={on}
        className="box-border flex max-w-[1000px] flex-none animate-rise-sm flex-wrap gap-[34px] rounded-[0_24px_24px_24px] bg-cream px-5 py-6 text-ink shadow-[0_30px_60px_rgba(30,2,4,0.35)] sm:px-9 sm:py-[30px]"
      >
        <div className="min-w-0 flex-[1_1_460px]">
          <p className="m-0 text-xs font-semibold tracking-[0.16em] uppercase text-panel">
            {c.dates} · {c.place}
          </p>
          <h2 className="mt-2 mb-0 font-serif text-[30px] leading-none font-semibold sm:text-[38px]">{c.role}</h2>
          <p className="mt-1.5 mb-0 text-base font-semibold">{c.co}</p>
          <p className="mt-3 mb-[18px] text-[15px] leading-[1.55] text-ink-soft">{c.ctx}</p>
          <h3 className="m-0 mb-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-panel">{t.contributed}</h3>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {c.bullets.map((b) => (
              <li key={b.t} className="flex gap-3 text-[15px] leading-normal">
                <span aria-hidden="true" className="font-serif font-semibold text-panel">
                  —
                </span>
                <span>
                  <strong className="font-semibold">{b.t}.</strong> {b.d}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-[0_1_280px] flex-col gap-3.5">
          {c.hi.map((h) => (
            <div key={h.t} className="rounded-2xl bg-panel px-[18px] py-4 text-cream">
              <p className="m-0 mb-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#f2c9bf]">{t.highlight}</p>
              <p className="m-0 mb-1.5 font-serif text-xl leading-[1.15] font-semibold">{h.t}</p>
              <p className="m-0 text-sm leading-normal">{h.d}</p>
            </div>
          ))}
          <div className="rounded-2xl bg-white px-[18px] py-4 shadow-[0_10px_24px_rgba(62,7,10,0.1)]">
            <p className="m-0 mb-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-panel">{t.tools}</p>
            <div className="flex flex-wrap gap-1.5">
              {c.stack.map((s) => (
                <Chip key={s} size="sm">
                  {s}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
