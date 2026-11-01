"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeFromPath } from "@/lib/i18n";

export function HtmlLocaleSync() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = localeFromPath(pathname);
  }, [pathname]);
  return null;
}
