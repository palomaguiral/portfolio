import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "./i18n";
import { siteUrl } from "./site";

type MetaKey = keyof ReturnType<typeof getDictionary>["meta"]["pages"];

export function buildMetadata(
  locale: Locale,
  key: MetaKey,
  path: string,
  override?: { title?: string; description?: string },
): Metadata {
  const dict = getDictionary(locale);
  const title = override?.title ?? dict.meta.pages[key].title;
  const description = override?.description ?? dict.meta.pages[key].description;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}${path}`;
  languages["x-default"] = `/es${path}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages },
    openGraph: {
      type: key === "home" ? "profile" : "website",
      title,
      description,
      url: `/${locale}${path}`,
      siteName: dict.meta.siteName,
      locale: locale === "es" ? "es_ES" : "en_GB",
      alternateLocale: locale === "es" ? ["en_GB"] : ["es_ES"],
      images: [{ url: "/paloma_retrato.jpg", width: 1000, height: 1053, alt: dict.home.portraitAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/paloma_retrato.jpg"],
    },
  };
}
