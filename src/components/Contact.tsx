"use client";

import { siteConfig } from "@/config/site";
import { trackSocialLink } from "@/utils/analytics";
import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const socialLinks = [
    {
      href: siteConfig.links.github,
      icon: FaGithub,
      label: "GitHub",
      platform: "github" as const,
    },
    {
      href: siteConfig.links.linkedin,
      icon: FaLinkedin,
      label: "LinkedIn",
      platform: "linkedin" as const,
    },
    {
      href: siteConfig.links.twitter,
      icon: FaTwitter,
      label: "Twitter",
      platform: "twitter" as const,
    },
    {
      href: siteConfig.links.instagram,
      icon: FaInstagram,
      label: "Instagram",
      platform: "instagram" as const,
    },
  ];

  return (
    <motion.section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-28 py-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <SectionHeading eyebrow="Contact">
          <span id="contact-title">Get in touch</span>
        </SectionHeading>
        <p className="text-slate-600 dark:text-grayTone max-w-2xl text-lg mt-3 leading-relaxed">
          I'm open to collaborating on interesting projects, discussing Web3, or
          exploring new opportunities. The fastest way to reach me is via
          LinkedIn, Twitter, or Instagram.
        </p>
      </motion.div>

      <GlassCard className="p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialLink(link.platform, link.href)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-4 rounded-lg border-2 border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5 px-6 py-4 text-slate-600 dark:text-grayTone hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent-bg-weak)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
              >
                <Icon className="text-2xl flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="font-medium text-lg">{link.label}</span>
                <span className="ml-auto text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  ↗
                </span>
              </motion.a>
            );
          })}
        </div>
      </GlassCard>
    </motion.section>
  );
}
