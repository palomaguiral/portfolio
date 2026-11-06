import Link from "next/link";
import type { ReactNode } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { href, pages, type PageKey } from "@/lib/site";
import LanguageSwitch from "./LanguageSwitch";

type Props = {
  lang: Locale;
  active: PageKey;
  children: ReactNode;
  /** Extra classes for the main panel (layout of the page content). */
  className?: string;
};

export default function PageShell({ lang, active, children, className = "" }: Props) {
  const t = getDictionary(lang).common;
  const isFirst = active === pages[0].key;

  return (
    <div className="flex min-h-dvh flex-col bg-outer font-sans text-cream lg:h-dvh lg:min-h-[820px] lg:overflow-hidden">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-cream px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.skipToContent}
      </a>
      <header className="flex items-end justify-between gap-3 px-[14px] pt-3.5 sm:gap-4 lg:px-7">
        <nav aria-label={t.nav.label} className="min-w-0 flex-1">
          <ul className="scrollbar-none -mb-px flex items-end gap-1 overflow-x-auto pt-2">
            {pages.map((p) => {
              const on = p.key === active;
              return (
                <li key={p.key} className="shrink-0">
                  <Link
                    href={href(lang, p.path)}
                    aria-current={on ? "page" : undefined}
                    className={`block whitespace-nowrap rounded-t-[14px] text-[15px] no-underline transition-transform duration-[250ms] ease-soft hover:-translate-y-[5px] ${
                      on
                        ? "bg-panel px-6 pt-3.5 pb-4 font-semibold text-cream"
                        : "bg-tab px-[22px] pt-3 pb-3.5 font-medium text-tabtext hover:text-white"
                    }`}
                  >
                    {t.nav[p.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <LanguageSwitch current={lang} label={t.language.label} names={{ es: t.language.es, en: t.language.en }} />
      </header>
      <main
        id="main"
        className={`relative mx-[14px] box-border min-h-0 flex-1 bg-panel ${
          isFirst ? "rounded-tr-[22px]" : "rounded-t-[22px]"
        } ${className}`}
      >
        {children}
      </main>
    </div>
  );
}
