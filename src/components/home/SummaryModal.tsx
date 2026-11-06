"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { contact } from "@/lib/site";
import { productLinks, productSlugs } from "@/lib/content";

type Props = {
  t: Dictionary["summary"];
  common: Dictionary["common"];
  buttonLabel: string;
};

export default function SummaryModal({ t, common, buttonLabel }: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const h3 = "m-0 mb-3 text-xs font-semibold tracking-[0.18em] uppercase text-panel";
  const strong = "font-serif text-lg font-semibold";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="mt-3.5 flex min-h-11 cursor-pointer items-center gap-3.5 self-start rounded-full border-0 bg-cream py-2 pr-[22px] pl-2 text-[15px] font-semibold text-outer transition-transform hover:-translate-y-0.5"
      >
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full bg-panel font-serif text-lg font-semibold text-cream"
        >
          1’
        </span>
        {buttonLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 box-border flex animate-fade items-center justify-center p-3 sm:p-[26px]">
          <div
            aria-hidden="true"
            onClick={close}
            className="absolute inset-0 bg-[rgba(30,2,4,0.62)] backdrop-blur-[6px]"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="summary-title"
            className="relative flex max-h-full w-[min(1300px,100%)] animate-pop flex-col overflow-auto rounded-[26px] bg-cream text-ink shadow-[0_40px_90px_rgba(20,0,2,0.5)]"
          >
            <div className="sticky top-0 z-[2] rounded-t-[26px] bg-cream">
              <div className="flex flex-wrap items-center justify-between gap-5 px-5 pt-6 pb-4 sm:px-9">
                <div className="flex items-center gap-5">
                  <Image
                    src="/paloma_retrato.jpg"
                    alt=""
                    width={78}
                    height={78}
                    sizes="78px"
                    className="hidden size-[78px] rounded-full object-cover object-[50%_25%] sm:block"
                  />
                  <div>
                    <p className="m-0 text-xs font-semibold tracking-[0.22em] uppercase text-panel">{t.eyebrow}</p>
                    <h2 id="summary-title" className="mt-1 mb-0 font-serif text-[32px] leading-none font-semibold sm:text-[44px]">
                      {t.name}
                    </h2>
                    <p className="mt-1.5 mb-0 text-[15px]">{t.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <a
                    href={contact.cv}
                    download
                    className="rounded-full bg-panel px-[22px] py-3.5 font-semibold text-cream no-underline hover:bg-[#a3161c]"
                  >
                    {common.downloadCv} <span aria-hidden="true">↓</span>
                  </a>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label={t.close}
                    className="flex size-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-ink bg-transparent text-[22px] text-ink hover:bg-ink hover:text-cream"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div aria-hidden="true" className="mx-5 h-[3px] bg-[#e3cfc4] sm:mx-9">
                <div className="h-full animate-bar bg-panel" />
              </div>
            </div>

            <div className="flex flex-col gap-6 px-5 pt-[22px] pb-[30px] sm:px-9">
              <p className="m-0 max-w-[980px] text-lg leading-normal font-medium sm:text-xl">{t.lead}</p>
              <p className="m-0 text-[15px] leading-[1.7]">
                <span className="mr-3.5 text-xs font-semibold tracking-[0.18em] uppercase text-panel">{t.areasLabel}</span>
                {t.areas}
              </p>

              <div className="grid grid-cols-1 gap-7 border-t border-[#d9c2b7] pt-[22px] sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <h3 className={h3}>{t.experienceTitle}</h3>
                  {t.experience.map((e) => (
                    <p key={e.role} className="m-0 mb-3 text-sm leading-[1.45] transition-[padding] hover:pl-1.5">
                      <strong className={strong}>{e.role}</strong>
                      <br />
                      {e.meta}
                      <br />
                      <span className="text-muted">{e.note}</span>
                    </p>
                  ))}
                </div>
                <div>
                  <h3 className={h3}>{t.productsTitle}</h3>
                  {t.products.map((p, i) => (
                    <a
                      key={p.name}
                      href={productLinks[productSlugs[i]]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-3 block text-sm leading-[1.45] text-ink no-underline transition-[padding] hover:pl-1.5 hover:text-panel"
                    >
                      <strong className={strong}>
                        {p.name} <span aria-hidden="true">↗</span>
                      </strong>
                      <br />
                      {p.meta}
                      <span className="sr-only"> {common.newTab}</span>
                    </a>
                  ))}
                </div>
                <div>
                  <h3 className={h3}>{t.educationTitle}</h3>
                  {t.education.map((e) => (
                    <p key={e.name} className="m-0 mb-3 text-sm leading-[1.45] transition-[padding] hover:pl-1.5">
                      <strong className={strong}>{e.name}</strong>
                      <br />
                      {e.meta}
                    </p>
                  ))}
                  <p className="m-0 text-sm leading-[1.45] text-muted">{t.certifications}</p>
                </div>
                <div>
                  <h3 className={h3}>{t.stackTitle}</h3>
                  {t.stack.map((s) => (
                    <p key={s.k} className="m-0 mb-2 text-[13.5px] leading-normal">
                      <strong>{s.k}:</strong> {s.v}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-7 gap-y-3.5 border-t border-[#d9c2b7] pt-[18px] text-sm font-medium">
                <a href={`mailto:${contact.email}`} className="text-ink no-underline hover:text-panel">
                  {contact.email}
                </a>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink no-underline hover:text-panel">
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-ink no-underline hover:text-panel">
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
