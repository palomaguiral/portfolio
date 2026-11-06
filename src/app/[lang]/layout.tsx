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

/**
 * The desktop pages are one-screen compositions designed at 1440×900. On smaller laptop
 * windows (e.g. 1536×730 with 125 % Windows scaling) scale the whole page down so it still
 * fits without scrolling — the same thing as zooming the browser out by hand. Never scales up,
 * never below 0.6 (below that the page simply scrolls), and does nothing under 1024 px wide,
 * where the stacked mobile layout takes over. --app-h is the window height in zoomed CSS px.
 */
const fitToScreen = `(function(){var d=document.documentElement;function f(){var w=innerWidth,h=innerHeight;if(w<1024){d.style.zoom="";d.style.removeProperty("--app-h");return}var z=Math.max(0.6,Math.min(1,w/1440,h/900));d.style.zoom=z===1?"":String(z);d.style.setProperty("--app-h",h/z+"px")}f();addEventListener("resize",f)})()`;

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
    // suppressHydrationWarning: the fit-to-screen script sets zoom/--app-h on <html> before React hydrates.
    <html lang={lang} className={`${bodoni.variable} ${inter.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: fitToScreen }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
