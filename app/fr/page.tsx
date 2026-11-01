import type { Metadata } from "next";
import { Homepage } from "@/components/store/homepage";

export const metadata: Metadata = {
  title: "Éloignez les distractions. Reprenez votre temps.",
  description: "Un cadenas à minuterie, trois boîtes verrouillables et une façon simple de garder les distractions hors de portée.",
  alternates: { canonical: "/fr", languages: { en: "/", de: "/de", fr: "/fr", sv: "/sv", no: "/no", da: "/da", fi: "/fi", nl: "/nl", it: "/it", es: "/es", pl: "/pl", cs: "/cs" } },
};

export default function FrenchHome() {
  return <Homepage campaign="general" locale="fr" />;
}
