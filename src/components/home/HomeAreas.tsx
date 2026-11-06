"use client";

import { useState } from "react";

type Area = { title: string; text: string };

type Props = {
  areas: Area[];
  label: string;
  note: string;
  contributes: string;
};

const ROW = 61;

export default function HomeAreas({ areas, label, note, contributes }: Props) {
  const [on, setOn] = useState(0);
  const top = Math.max(0, Math.min(on * ROW - 20, (areas.length - 1) * ROW - 150));
  const current = areas[on];

  return (
    <section aria-label={label} className="relative flex min-w-0 flex-[1_1_560px] flex-col gap-7 lg:flex-row">
      <ul className="m-0 flex-[0_1_420px] list-none border-t border-cream/35 p-0">
        {areas.map((a, i) => {
          const act = i === on;
          return (
            <li key={a.title} className="border-b border-cream/35">
              <button
                type="button"
                onMouseEnter={() => setOn(i)}
                onFocus={() => setOn(i)}
                onClick={() => setOn(i)}
                aria-expanded={act}
                className={`flex w-full cursor-pointer items-baseline gap-3.5 border-0 bg-transparent py-3 text-left transition-[color,padding] duration-[250ms,350ms] ease-soft ${
                  act ? "pl-3.5 text-white" : "pl-0 text-rose"
                }`}
              >
                <span className={`font-serif text-[26px] leading-[1.05] font-semibold sm:text-[31px] ${act ? "italic" : ""}`}>
                  {a.title}
                </span>
              </button>
              {/* Mobile: the card opens right under the tapped area (accordion). */}
              {act && (
                <div key={on} className="mb-3 animate-rise-sm rounded-[18px] bg-cream px-5 py-4 text-[#4a080b] lg:hidden">
                  <p className="m-0 mb-2 text-xs font-semibold tracking-[0.14em] uppercase">{contributes}</p>
                  <p className="m-0 text-[15px] leading-[1.55] whitespace-pre-line">{a.text}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[462px] -left-2 hidden items-start gap-1.5 lg:flex"
      >
        <svg viewBox="0 0 70 80" className="h-16 w-14">
          <path d="M52 74 C 10 70, 6 36, 26 8" fill="none" stroke="#F4E7D7" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M15 17 L26 7 L33 21" fill="none" stroke="#F4E7D7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="mt-[34px] mb-0 font-hand text-[25px] leading-[1.1] text-cream">{note}</p>
      </div>

      <div className="relative hidden min-w-[200px] flex-[1_1_220px] lg:block" aria-live="polite">
        <div
          key={on}
          className="animate-why absolute right-0 left-0 rounded-[18px] bg-cream px-[22px] py-5 text-[#4a080b]"
          style={{ top }}
        >
          <p className="m-0 mb-2 text-xs font-semibold tracking-[0.14em] uppercase">
            {contributes} · {current.title}
          </p>
          <p className="m-0 text-[15px] leading-[1.55] whitespace-pre-line">{current.text}</p>
        </div>
      </div>
    </section>
  );
}
