"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SiteCopy } from "@/lib/site-copy";

const easeCurve = [0.22, 1, 0.36, 1] as const;
const showNavbarOffset = 56;

const navbarMotion = {
  hidden: {
    opacity: 0,
    y: -24,
    visibility: "hidden" as const,
  },
  visible: {
    opacity: 1,
    y: 0,
    visibility: "visible" as const,
  },
};

type NavbarProps = {
  content: SiteCopy["navbar"];
};

export function Navbar({ content }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > showNavbarOffset);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  return (
    <motion.header
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={navbarMotion}
      transition={{ duration: 0.35, ease: easeCurve }}
      className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6 lg:px-8"
      style={{
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <div className="liquid-panel mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-full px-4 py-2 sm:px-5">
        <a
          href="#top"
          aria-label={content.homeLabel}
          className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] sm:text-[0.78rem] sm:tracking-[0.2em]"
        >
          <span className="sm:hidden">CLOUSRY</span>
          <span className="hidden sm:inline">Project : CLOUSRY&apos;S SPACE</span>
        </a>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          {content.navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="inline-flex h-8 items-center justify-center rounded-full px-2 text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--surface-soft)] hover:text-[var(--text-primary)] sm:h-10 sm:px-4 sm:text-[0.72rem] sm:tracking-[0.18em]"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="glass-button inline-flex h-9 shrink-0 items-center justify-center rounded-full px-3.5 text-[0.68rem] font-medium tracking-[-0.01em] text-[var(--text-primary)] transition-all duration-300 hover:translate-y-[-1px] sm:h-11 sm:px-4 sm:text-sm sm:tracking-[-0.02em]"
        >
          {content.contactCta}
        </a>
      </div>
    </motion.header>
  );
}
