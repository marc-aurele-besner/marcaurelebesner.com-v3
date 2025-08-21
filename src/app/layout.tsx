import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Spotlight from "../components/Spotlight";
import Backdrop from "../components/Backdrop";
import ThemeProvider from "../components/ThemeProvider";
import ScrollProgress from "../components/ScrollProgress";
import { siteConfig } from "@/config/site";

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
  themeColor: "#0a192f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)] relative overflow-x-hidden`}
      >
        <ThemeProvider>
          <ScrollProgress />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[var(--accent)] text-white px-4 py-2 rounded-xl font-medium shadow-lg"
          >
            Skip to main content
          </a>
          {/* Background effects */}
          <Backdrop />
          <Spotlight />
          <Header />
          <div className="flex min-h-screen md:flex-row flex-col">
            <aside className="md:w-80 lg:w-72 bg-[var(--surface)]/80 backdrop-blur-xl border-r border-[var(--border)] p-8 fixed h-full hidden md:block shadow-sm">
              <Menu />
            </aside>
            <main id="main-content" className="flex-1 overflow-y-auto py-20 md:py-24 md:ml-80 lg:ml-72 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
