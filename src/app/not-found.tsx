import { siteConfig } from "@/config/site";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
      <GlassCard className="p-8 lg:p-12 max-w-lg text-center">
        <div className="mb-6">
          <span className="text-8xl font-bold text-[var(--accent)] opacity-50">
            404
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white/95 mb-4">
          Page Not Found
        </h1>
        <p className="text-slate-600 dark:text-grayTone mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] text-darkBlue font-semibold rounded-lg hover:brightness-110 transition-all duration-200"
          >
            Go Home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[var(--accent)] text-[var(--accent)] font-semibold rounded-lg hover:bg-[var(--accent-bg-weak)] transition-all duration-200"
          >
            View Projects
          </Link>
        </div>
        <p className="mt-8 text-sm text-slate-500 dark:text-grayTone">
          Looking for something specific? Check out my{" "}
          <Link href="/#experience" className="text-[var(--accent)] hover:underline">
            experience
          </Link>{" "}
          or{" "}
          <Link href="/#contact" className="text-[var(--accent)] hover:underline">
            contact me
          </Link>
          .
        </p>
      </GlassCard>
    </div>
  );
}
