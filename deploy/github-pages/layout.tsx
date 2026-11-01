import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer";
import { AppProviders } from "@/components/providers/app-providers";
import { HtmlLocaleSync } from "@/components/providers/html-locale-sync";
import { SharePasswordGate } from "@/components/privacy/share-password-gate";
import { siteConfig } from "@/lib/site-config";

const geist = Geist({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Pausio.eu — Lock distractions away", template: "%s · Pausio.eu" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Pausio.eu", title: "Pausio.eu — Lock distractions away", description: siteConfig.description, url: "/" },
  twitter: { card: "summary_large_image", title: "Pausio.eu", description: siteConfig.description },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f7f2", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.className} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <HtmlLocaleSync />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SharePasswordGate>
          <AppProviders>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </AppProviders>
        </SharePasswordGate>
      </body>
    </html>
  );
}
