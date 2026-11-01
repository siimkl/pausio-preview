import { NextRequest, NextResponse } from "next/server";
import { LOCALE_COOKIE, LOCALES, type Locale } from "@/lib/i18n";

function preferredLocale(header: string | null): Exclude<Locale, "en"> | null {
  if (!header) return null;
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, ...parameters] = part.trim().split(";");
      const q = Number(parameters.find((parameter) => parameter.trim().startsWith("q="))?.split("=")[1] ?? "1");
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q)[0]?.tag;
  const language = preferred?.split("-")[0];
  if (language === "nb" || language === "nn" || language === "no") return "no";
  if (["de", "fr", "sv", "da", "fi", "nl", "it", "es", "pl", "cs"].includes(language || "")) return language as Exclude<Locale, "en">;
  return null;
}

function canLocalize(pathname: string) {
  return pathname === "/" || pathname === "/checkout" || pathname.startsWith("/products/");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const segment = pathname.split("/")[1];
  const pathLocale = LOCALES.includes(segment as Locale) && segment !== "en" ? segment as Exclude<Locale, "en"> : null;
  const detectedLocale = preferredLocale(request.headers.get("accept-language"));
  const saved = LOCALES.includes(savedLocale as Locale) ? savedLocale as Locale : null;
  const locale = pathLocale || saved || (!savedLocale && detectedLocale ? detectedLocale : "en");

  if (!pathLocale && locale !== "en" && canLocalize(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(url);
    if (!savedLocale) response.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 31536000, sameSite: "lax" });
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-tlb-locale", pathLocale || "en");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg|manifest.webmanifest|robots.txt|sitemap.xml).*)"],
};
