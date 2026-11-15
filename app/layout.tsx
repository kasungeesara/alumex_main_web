import type { Metadata } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./residence.css";
import { PageTransition } from "@/components/providers/page-transition";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SiteLoader } from "@/components/providers/site-loader";
import { AluqLauncher } from "@/components/aluq/launcher";
import { getAluqCatalog, getAluqWebsiteKnowledge } from "@/lib/aluq/catalog";

const interTight = localFont({
  src: [
    { path: "../public/fonts/inter-tight-400.ttf", weight: "400" },
    { path: "../public/fonts/inter-tight-500.ttf", weight: "500" },
    { path: "../public/fonts/inter-tight-600.ttf", weight: "600" },
    { path: "../public/fonts/inter-tight-700.ttf", weight: "700" },
  ],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alumex | Ultimate in Aluminium Profiles",
  description: "Sri Lanka’s foremost aluminium extrusion manufacturer. Discover architectural, industrial and residential aluminium solutions by Alumex PLC.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={interTight.variable}>
      {/* Extensions can inject body attributes such as cz-shortcut-listen before hydration. */}
      <body suppressHydrationWarning><SiteLoader /><SmoothScroll /><PageTransition />{children}<AluqLauncher products={getAluqCatalog()} topics={getAluqWebsiteKnowledge()} /></body>
    </html>
  );
}
