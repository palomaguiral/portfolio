import type { Locale } from "./i18n";

// Public URL used for canonical links, hreflang, Open Graph and the sitemap.
// Set NEXT_PUBLIC_SITE_URL for a custom domain; otherwise Render's own URL is used.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.RENDER_EXTERNAL_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const contact = {
  email: "palomaguiral@gmail.com",
  linkedin: "https://es.linkedin.com/in/paloma-guiral-ortuno",
  linkedinHandle: "paloma-guiral-ortuno",
  github: "https://github.com/palomaguiral",
  githubHandle: "palomaguiral",
  cv: "/cv-paloma-guiral.pdf",
};

/** Pages in tab order. `path` is the part after the locale prefix. */
export const pages = [
  { key: "home", path: "" },
  { key: "experience", path: "/experiencia" },
  { key: "products", path: "/productos" },
  { key: "analysis", path: "/analisis" },
  { key: "stack", path: "/stack" },
  { key: "education", path: "/educacion" },
  { key: "contact", path: "/contacto" },
] as const;

export type PageKey = (typeof pages)[number]["key"];

export function href(locale: Locale, path: string) {
  return `/${locale}${path}`;
}
