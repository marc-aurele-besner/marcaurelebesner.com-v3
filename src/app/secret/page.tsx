import React from "react";
import NextDynamic from "next/dynamic";

export const dynamic = "force-static";

const SecretScene = NextDynamic(() => import("@/components/SecretScene"));

export default function SecretPage(): JSX.Element {
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

