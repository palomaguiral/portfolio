"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

type Props = {
  current: Locale;
  label: string;
  names: Record<Locale, string>;
};

export default function LanguageSwitch({ current, label, names }: Props) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = pathname.replace(/^\/(es|en)(?=\/|$)/, "");

  return (
    <nav
      aria-label={label}
      className="mb-2.5 flex shrink-0 gap-0.5 rounded-full border border-cream/40 p-[3px]"
    >
      {locales.map((l) => {
        const active = l === current;
        return (
          <Link
            key={l}
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            aria-label={names[l]}
            scroll={false}
            className={`flex min-h-9 items-center rounded-full px-[13px] py-2 text-sm font-semibold uppercase no-underline transition-colors ${
              active ? "bg-cream text-outer" : "text-cream hover:bg-cream/15"
            }`}
          >
            {l}
          </Link>
        );
      })}
    </nav>
  );
}
