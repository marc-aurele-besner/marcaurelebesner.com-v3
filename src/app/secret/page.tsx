import type { Metadata } from "next";
import SecretScene from "@/components/SecretScene";

export const dynamic = "force-static";
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SecretPage() {
  return (
    <section className="relative">
      <SecretScene />
      <div id="more" className="mx-auto max-w-2xl px-4 pb-24 text-center mt-6 space-y-4">
        <p className="text-sm opacity-80">
          This page is off the main path. Thanks for finding it.
        </p>
      </div>
    </section>
  );
}

