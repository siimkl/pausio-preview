import Link from "next/link";

export function LegalPage({ eyebrow, title, updated, children }: { eyebrow: string; title: string; updated: string; children: React.ReactNode }) {
  return <div className="container legal-page"><header><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="legal-review">Draft for legal review · Last updated {updated}</div></header><article>{children}</article><Link className="back-link" href="/">← Back to Pausio.eu</Link></div>;
}
