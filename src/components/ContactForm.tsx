"use client";

import { sendContactEmail } from "@/app/actions/contact";
import { FormEvent, useState } from "react";
import GlassCard from "./GlassCard";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);

      const result = await sendContactEmail(formDataToSend);

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setErrorMessage(
          result.error ||
            "Something went wrong. Please try again or reach out via social media."
        );
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again or reach out via social media."
      );
    }
  };

  return (
    <GlassCard className="p-6 mt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 dark:text-gray-200 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2 text-slate-900 dark:text-gray-100 placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            placeholder="Your name"
            disabled={status === "submitting"}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-gray-200 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2 text-slate-900 dark:text-gray-100 placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            placeholder="your.email@example.com"
            disabled={status === "submitting"}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-700 dark:text-gray-200 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2 text-slate-900 dark:text-gray-100 placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition resize-none"
            placeholder="Tell me about your project, idea, or just say hello..."
            disabled={status === "submitting"}
          />
        </div>

        {status === "error" && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-2 text-sm text-red-700 dark:text-red-400">
            {errorMessage}
          </div>
        )}

        {status === "success" && (
          <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-2 text-sm text-green-700 dark:text-green-400">
            Message sent! I&apos;ll get back to you soon.
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-lg bg-[var(--accent)] text-darkBlue font-semibold px-6 py-3 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </GlassCard>
  );
}
