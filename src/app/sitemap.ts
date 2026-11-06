import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { productSlugs } from "@/lib/content";
import { pages, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...pages.map((p) => p.path), ...productSlugs.map((s) => `/productos/${s}`)];
  return paths.flatMap((path) =>
    locales.map((l) => ({
      url: `${siteUrl}/${l}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((x) => [x, `${siteUrl}/${x}${path}`])),
      },
    })),
  );
}
