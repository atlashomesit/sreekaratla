import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { StructuredData } from "@/components/structured-data";
import Script from "next/script";

// Mono face for eyebrows, labels, dates, track codes, and the hero meta line.
// Self-hosted at build time; exposed as `--font-mono` and wired to Tailwind's font-mono.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap"
});

export const runtime = "edge";
export const preferredRegion = "auto";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plexMono.variable} suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 bg-background/95">{children}</main>
            <Footer />
          </div>
          <Analytics />
        </ThemeProvider>
        <Script src="/pagefind/pagefind.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
