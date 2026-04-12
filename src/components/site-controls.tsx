"use client";

import { motion } from "framer-motion";
import type { Locale, SiteCopy } from "@/lib/site-copy";

const easeCurve = [0.22, 1, 0.36, 1] as const;
const locales = ["en", "tr"] as const;

type SiteControlsProps = {
  content: SiteCopy["navbar"];
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
};

export function SiteControls({
  content,
  locale,
  onLocaleChange,
  theme,
  onThemeChange,
}: SiteControlsProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15, ease: easeCurve }}
      className="pointer-events-none fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 sm:flex-col sm:items-end sm:px-0"
    >
      <div className="liquid-pill pointer-events-auto flex items-center rounded-full p-1">
        {[
          { id: "light", label: content.themeLightLabel },
          { id: "dark", label: content.themeDarkLabel },
        ].map((option) => {
          const isActive = theme === option.id;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onThemeChange(option.id as "light" | "dark")}
              className={`inline-flex h-8 items-center justify-center rounded-full px-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:h-9 sm:px-3 sm:text-[0.68rem] ${
                isActive ? "primary-button" : "text-[var(--text-secondary)]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="liquid-pill pointer-events-auto flex items-center rounded-full p-1 sm:self-end">
        {locales.map((option) => {
          const isActive = locale === option;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => onLocaleChange(option)}
              className={`inline-flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:h-9 sm:min-w-10 sm:px-3 sm:text-[0.68rem] ${
                isActive ? "primary-button" : "text-[var(--text-secondary)]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </motion.aside>
  );
}
