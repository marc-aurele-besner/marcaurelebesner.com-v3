"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="relative rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-[0_0_0_0_rgba(100,255,218,0.0)] p-8 max-w-md w-full text-center">
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 dark:via-white/30 to-transparent" />

        <h2 className="text-2xl font-bold text-slate-800 dark:text-grayTone mb-2">
          Something went wrong
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {error.message || "An unexpected error occurred."}
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-darkBlue font-medium hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 font-medium hover:border-[var(--accent-weak)] transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
