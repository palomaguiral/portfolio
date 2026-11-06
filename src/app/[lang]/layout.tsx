import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { Bodoni_Moda, Caveat, Inter_Tight } from "next/font/google";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { contact, siteUrl } from "@/lib/site";
import "../globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});
const inter = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#5A0A0E",
};

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Paloma Guiral Ortuño",
    jobTitle: dict.meta.jobTitle,
    url: `${siteUrl}/${lang}`,
    image: `${siteUrl}/paloma_retrato.jpg`,
    email: `mailto:${contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Valencia", addressCountry: "ES" },
    sameAs: [contact.linkedin, contact.github],
    knowsLanguage: ["es", "ca", "en"],
  };

  return (
    <html lang={lang} className={`${bodoni.variable} ${inter.variable} ${caveat.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
