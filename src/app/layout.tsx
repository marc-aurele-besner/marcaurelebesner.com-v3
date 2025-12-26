import ScrollProgress from "@/components/ScrollProgress";
import { siteConfig } from "@/config/site";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Backdrop from "../components/Backdrop";
import EasterEggs from "../components/EasterEggs";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Spotlight from "../components/Spotlight";
import ThemeProvider from "../components/ThemeProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0a192f",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: { canonical: "/" },
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-800 dark:bg-darkBlue dark:text-grayTone relative overflow-x-hidden`}
      >
        <ThemeProvider>
          <EasterEggs />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-[var(--accent)] text-darkBlue px-3 py-2 rounded"
          >
            Skip to main content
          </a>
          <ScrollProgress />
          {/* Background effects */}
          <Backdrop />
          <Spotlight />
          <Header />
          <div className="flex min-h-screen md:flex-row flex-col">
            <aside className="md:w-72 bg-white/70 dark:bg-darkBlue/70 backdrop-blur border-r border-slate-200 dark:border-white/5 p-8 fixed h-full hidden md:block">
              <Menu />
            </aside>
            <main
              id="main-content"
              className="flex-1 overflow-y-auto py-16 md:ml-72 px-4 sm:px-6 lg:px-8"
            >
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
      {siteConfig.googleAnalyticsId && (
        <GoogleAnalytics gaId={siteConfig.googleAnalyticsId} />
      )}
    </html>
  );
}
