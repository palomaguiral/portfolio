"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Item = { key: string; href: string; label: string };

type Props = {
  items: Item[];
  active: string;
  navLabel: string;
  menuLabel: string;
  closeLabel: string;
};

/** Dropdown menu used below the lg breakpoint, where the seven folder tabs don't fit. */
export default function MobileNav({ items, active, navLabel, menuLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const current = items.find((i) => i.key === active) ?? items[0];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative min-w-0 flex-1 lg:hidden">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : `${menuLabel}: ${current.label}`}
        onClick={() => setOpen((v) => !v)}
        className="flex max-w-full cursor-pointer items-center gap-3 rounded-t-[14px] border-0 bg-panel px-5 pt-3.5 pb-4 text-[15px] font-semibold text-cream"
      >
        <span aria-hidden="true" className="flex w-[18px] flex-col gap-[4px]">
          <span className={`h-[2px] rounded bg-cream transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-[2px] rounded bg-cream transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] rounded bg-cream transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </span>
        <span className="truncate">{current.label}</span>
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={navLabel}
          className="absolute top-full left-0 z-40 mt-2 w-[min(320px,calc(100vw-28px))] animate-rise-sm rounded-[18px] bg-cream p-2 text-ink shadow-[0_24px_50px_rgba(30,2,4,0.45)]"
        >
          <ul className="m-0 list-none p-0">
            {items.map((i) => {
              const on = i.key === active;
              return (
                <li key={i.key}>
                  <Link
                    href={i.href}
                    aria-current={on ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-12 items-center justify-between rounded-xl px-4 font-serif text-xl font-semibold no-underline ${
                      on ? "bg-panel text-cream" : "text-ink hover:bg-ink/5"
                    }`}
                  >
                    {i.label}
                    {on ? null : <span aria-hidden="true" className="font-sans text-base text-panel">→</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
