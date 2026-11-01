import type { Metadata } from "next";
import { Homepage } from "@/components/store/homepage";

export default function Home() {
  return <Homepage campaign="general" />;
}

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { en: "/", de: "/de", fr: "/fr", sv: "/sv", no: "/no", da: "/da", fi: "/fi", nl: "/nl", it: "/it", es: "/es", pl: "/pl", cs: "/cs" } },
};
