import React from "react";
import Link from "next/link";

export const dynamic = "force-static";

export default function SecretPage(): JSX.Element {
  return (
    <section className="max-w-2xl mx-auto mt-20 text-center space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight">
        You found the secret room! 🔐
      </h1>
      <p className="text-lg opacity-90">
        Explorers get rewarded. There are more surprises elsewhere — keep looking.
      </p>
      <div className="mx-auto w-full max-w-md rounded-2xl p-6 bg-gradient-to-br from-teal-300/20 to-emerald-500/10 border border-teal-300/30 backdrop-blur">
        <p className="font-mono text-sm opacity-80">
          Hint: Classic gamers know the way. Try a famous code on the home page.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--accent)] text-darkBlue font-semibold hover:opacity-90 transition-opacity"
      >
        Take me back
        <span aria-hidden>↩</span>
      </Link>
    </section>
  );
}

