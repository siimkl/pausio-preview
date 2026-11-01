import type { Metadata } from "next";
import { Homepage } from "@/components/store/homepage";
import { getCampaignVariant } from "@/lib/site-config";

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const rawCampaign = Array.isArray(params.utm_campaign) ? params.utm_campaign[0] : params.utm_campaign;
  return <Homepage campaign={getCampaignVariant(rawCampaign)} />;
}
export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { en: "/", de: "/de", fr: "/fr", sv: "/sv", no: "/no", da: "/da", fi: "/fi", nl: "/nl", it: "/it", es: "/es", pl: "/pl", cs: "/cs" } },
};

