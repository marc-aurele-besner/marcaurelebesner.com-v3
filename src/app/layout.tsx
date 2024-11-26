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

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "My personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-darkBlue text-grayTone`}
      >
        <Header />
        <div className="flex min-h-screen md:flex-row flex-col">
          <aside className="w-120 bg-darkBlue p-8 fixed h-full hidden md:block">
            <Menu />
          </aside>
          <main className="flex-1 overflow-y-auto py-16 md:ml-64 px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
