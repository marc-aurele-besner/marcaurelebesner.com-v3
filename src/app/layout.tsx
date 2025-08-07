import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Menu from "../components/Menu";
import Header from "../components/Header";

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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcaurelebesner.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Marc‑Aurele Besner — Web3 Full‑Stack Engineer",
    template: "%s | Marc‑Aurele Besner",
  },
  description:
    "Web3 full‑stack engineer building blockchain apps, smart contracts, and open‑source tools. Portfolio, experience, and selected projects.",
  alternates: { canonical: "/" },
  authors: [{ name: "Marc‑Aurele Besner", url: "https://marcaurelebesner.com" }],
  openGraph: {
    url: "/",
    siteName: "Marc‑Aurele Besner",
    type: "website",
    title: "Marc‑Aurele Besner — Web3 Full‑Stack Engineer",
    description:
      "Web3 full‑stack engineer building blockchain apps, smart contracts, and open‑source tools.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@marcaureleb",
    title: "Marc‑Aurele Besner — Web3 Full‑Stack Engineer",
    description:
      "Web3 full‑stack engineer building blockchain apps, smart contracts, and open‑source tools.",
  },
  themeColor: "#0a192f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-darkBlue text-grayTone relative overflow-x-hidden`}
      >
        {/* Subtle background glow layers */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-lightCyan/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-lightCyan/10 blur-3xl" />
        </div>
        <Header />
        <div className="flex min-h-screen md:flex-row flex-col">
          <aside className="md:w-72 bg-darkBlue/90 p-8 fixed h-full hidden md:block border-r border-white/5">
            <Menu />
          </aside>
          <main className="flex-1 overflow-y-auto py-16 md:ml-72 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
