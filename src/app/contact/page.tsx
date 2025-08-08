import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Marc‑Aurele Besner for collaboration, opportunities, or questions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="py-4">
      <Contact />
    </div>
  );
}