"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import type { SiteCopy } from "@/lib/site-copy";

const easeCurve = [0.22, 1, 0.36, 1] as const;
const softwareBadgeClassByCode: Record<string, string> = {
  Ps: "bg-[#001833] text-[#31a8ff] ring-1 ring-inset ring-[#31a8ff]/18",
  Pr: "bg-[#210031] text-[#d28cff] ring-1 ring-inset ring-[#d28cff]/18",
  Ae: "bg-[#14002d] text-[#cfa8ff] ring-1 ring-inset ring-[#cfa8ff]/18",
  Ai: "bg-[#2b1200] text-[#ff9a1f] ring-1 ring-inset ring-[#ff9a1f]/18",
};

const defaultBadgeClass = "bg-[var(--surface-softer)] text-[var(--text-primary)] ring-1 ring-inset ring-[var(--line-soft)]";

type CapabilitiesGridProps = {
  content: SiteCopy["capabilities"];
};

export function CapabilitiesGrid({ content }: CapabilitiesGridProps) {
  return (
    <section className="py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: easeCurve }}
        className="mb-8 flex flex-col gap-3 px-1 sm:mb-10"
      >
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
          {content.eyebrow}
        </p>
        <h2 className="balanced-text max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)] sm:text-5xl">
          {content.title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <BentoCard className="p-7 sm:p-9">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-softer)] text-[var(--text-primary)]">
            <Camera className="h-6 w-6" strokeWidth={1.7} />
          </div>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
            {content.visual.eyebrow}
          </p>
          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-[2rem]">
            {content.visual.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
            {content.visual.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {content.softwareItems.map(({ code, name }) => (
              <div
                key={code}
                className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line-soft)] bg-[var(--surface-soft)] px-3 py-2"
              >
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {code}
                </span>
                <span className="text-sm tracking-[-0.02em] text-[var(--text-primary)]">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard className="overflow-hidden p-7 sm:p-9">
          <div className="absolute inset-0 bg-[var(--toolset-glow)]" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
              {content.toolset.eyebrow}
            </p>
            <h3 className="mt-4 max-w-sm text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
              {content.toolset.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              {content.toolset.description}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {content.softwareItems.map(({ code, description, focus, name }) => (
                <div
                  key={code}
                  className="glass-soft-card rounded-[24px] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold tracking-[-0.04em] ${softwareBadgeClassByCode[code] ?? defaultBadgeClass}`}
                    >
                      {code}
                    </div>
                    <span className="rounded-full bg-[var(--chip-bg)] px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {focus}
                    </span>
                  </div>
                  <p className="mt-5 text-base font-medium tracking-[-0.03em] text-[var(--text-primary)]">
                    {name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        <BentoCard className="p-7 sm:p-9 xl:col-span-2">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
            {content.process.eyebrow}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {content.process.items.map(({ description, title }) => (
              <div key={title} className="rounded-[22px] bg-[var(--surface-soft)] p-5">
                <p className="text-sm font-medium tracking-[-0.02em] text-[var(--text-primary)]">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
