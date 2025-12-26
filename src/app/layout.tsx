import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Spotlight from "../components/Spotlight";
import Backdrop from "../components/Backdrop";
import ThemeProvider from "../components/ThemeProvider";
import EasterEggs from "../components/EasterEggs";
import { siteConfig } from "@/config/site";
import ScrollProgress from "@/components/ScrollProgress";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  themeColor: "#0a0a0f",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark bg-darkBlue text-grayTone relative overflow-x-hidden`}
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
            <aside className="md:w-72 bg-darkBlue/90 backdrop-blur-md border-r border-[var(--accent)]/20 p-8 fixed h-full hidden md:block neon-border">
              <Menu />
            </aside>
            <main id="main-content" className="flex-1 overflow-y-auto py-16 md:ml-72 px-4 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
        {siteConfig.googleAnalyticsId && (
          <GoogleAnalytics gaId={siteConfig.googleAnalyticsId} />
        )}
      </body>
    </html>
  );
}
