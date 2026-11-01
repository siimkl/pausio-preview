import type { Metadata } from "next";
import { Homepage } from "@/components/store/homepage";

export const metadata: Metadata = {
  title: "Ablenkungen weg. Zeit zurück.",
  description: "Ein Zeitschloss, drei abschließbare Boxen und eine einfache Möglichkeit, Ablenkungen außer Reichweite zu halten.",
  alternates: { canonical: "/de", languages: { en: "/", de: "/de", fr: "/fr", sv: "/sv", no: "/no", da: "/da", fi: "/fi", nl: "/nl", it: "/it", es: "/es", pl: "/pl", cs: "/cs" } },
};

export default function GermanHome() {
  return <Homepage campaign="general" locale="de" />;
}
