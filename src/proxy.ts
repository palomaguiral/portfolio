import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, locales } from "@/lib/i18n";

const ONE_YEAR = 60 * 60 * 24 * 365;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  // Already prefixed: remember the language the visitor is browsing in.
  if (hasLocale(first)) {
    const res = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== first) {
      res.cookies.set(LOCALE_COOKIE, first, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    }
    return res;
  }

  // No prefix: send to the remembered language, or Spanish by default.
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = saved && (locales as readonly string[]).includes(saved) ? saved : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and any file with an extension (images, PDFs, sitemap.xml, robots.txt…).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
