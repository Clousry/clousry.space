"use client";

import { motion } from "framer-motion";
import type { SiteCopy } from "@/lib/site-copy";

const easeCurve = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: easeCurve,
    },
  },
};

type HeroProps = {
  content: SiteCopy["hero"];
};

export function Hero({ content }: HeroProps) {
  const [titleLead, ...titleRest] = content.title.split(", ");

  return (
    <motion.section
      id="top"
      variants={container}
      initial="hidden"
      animate="show"
      className="relative flex min-h-[70vh] flex-col items-center justify-center px-2 py-14 text-center sm:min-h-[76vh] sm:py-20"
    >
      <motion.div
        variants={item}
        className="glass-panel mb-6 inline-flex items-center rounded-full px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--text-secondary)]"
      >
        {content.eyebrow}
      </motion.div>

      <motion.h1
        variants={item}
        className="balanced-text max-w-5xl text-[2.9rem] font-semibold tracking-[-0.065em] text-[var(--text-primary)] sm:text-[4.2rem] md:text-[5.2rem] lg:text-[6.25rem]"
      >
        {titleRest.length > 0 ? (
          <>
            {titleLead},
            <br className="hidden sm:block" /> {titleRest.join(", ")}
          </>
        ) : (
          content.title
        )}
      </motion.h1>

      <motion.p
        variants={item}
        className="balanced-text mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8"
      >
        {content.description}
      </motion.p>

      <motion.div variants={item} className="mt-10">
        <motion.a
          href="#showreel"
          whileHover={{ scale: 1.035 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.24, ease: easeCurve }}
          className="primary-button inline-flex min-h-14 items-center justify-center rounded-full px-7 text-sm font-medium tracking-[-0.02em]"
        >
          {content.cta}
        </motion.a>
      </motion.div>

      <motion.div
        variants={item}
        className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-3"
      >
        {content.stats.map(({ label, value }) => (
          <div key={label} className="glass-panel rounded-[24px] px-5 py-4">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {label}
            </p>
            <p className="mt-2 text-sm tracking-[-0.025em] text-[var(--text-primary)]">
              {value}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
