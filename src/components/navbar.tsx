"use client";

import { motion } from "framer-motion";
import type { SiteCopy } from "@/lib/site-copy";

const easeCurve = [0.22, 1, 0.36, 1] as const;

type NavbarProps = {
  content: SiteCopy["navbar"];
};

export function Navbar({ content }: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: easeCurve }}
      className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8"
    >
      <div className="glass-panel liquid-panel mx-auto flex w-full max-w-7xl flex-col gap-3 rounded-[28px] px-4 py-3 sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-0 sm:rounded-full sm:px-5 sm:py-2">
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="#top"
            aria-label={content.homeLabel}
            className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-primary)] sm:text-[0.78rem]"
          >
            Project : CLOUSRY&apos;S SPACE
          </a>
        </div>

        <nav className="flex items-center justify-center gap-1 sm:justify-center md:flex">
          {content.navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="inline-flex h-10 items-center justify-center rounded-full px-3 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--surface-soft)] hover:text-[var(--text-primary)] sm:px-4 sm:text-[0.72rem]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-center gap-2 sm:justify-end">
          <a
            href="#contact"
            className="glass-button inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-medium tracking-[-0.02em] text-[var(--text-primary)] transition-all duration-300 hover:translate-y-[-1px]"
          >
            {content.contactCta}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
