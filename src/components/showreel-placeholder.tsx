"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteCopy } from "@/lib/site-copy";

const easeCurve = [0.22, 1, 0.36, 1] as const;

const portfolioFilms = [
  {
    title: "I'm not today okay kısa film",
    embedSrc: "https://www.youtube-nocookie.com/embed/g9pT1YpcWXk?rel=0",
  },
  {
    title: "Sessiz Gemi The Silent Ship Kısa Film Short Movie",
    embedSrc: "https://www.youtube-nocookie.com/embed/PxaIZfRVhyQ?rel=0",
  },
] as const;

type ShowreelPlaceholderProps = {
  content: SiteCopy["showreel"];
};

export function ShowreelPlaceholder({ content }: ShowreelPlaceholderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? portfolioFilms.length - 1 : currentIndex - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === portfolioFilms.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <motion.section
      id="showreel"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: easeCurve }}
      className="pb-6"
    >
      <div className="mb-5 px-1">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
          {content.eyebrow}
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-[32px]">
          <motion.div
            animate={{ x: `${activeIndex * -100}%` }}
            transition={{ duration: 0.55, ease: easeCurve }}
            className="flex"
          >
            {portfolioFilms.map(({ embedSrc, title }) => (
              <div key={embedSrc} className="w-full shrink-0">
                <div className="soft-card overflow-hidden rounded-[32px] p-3 sm:p-4">
                  <div className="showreel-shell relative aspect-video w-full overflow-hidden rounded-[28px]">
                    <div className="showreel-overlay pointer-events-none absolute inset-0 opacity-40" />
                    <iframe
                      src={embedSrc}
                      title={title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>

                  <div className="px-2 pb-2 pt-4">
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      {content.areaLabel}
                    </p>
                    <p className="mt-2 text-base font-medium tracking-[-0.03em] text-[var(--text-primary)]">
                      {title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-5 sm:px-7">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Previous portfolio video"
            className="glass-panel pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-primary)] transition-transform duration-300 hover:scale-[1.04]"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next portfolio video"
            className="glass-panel pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-primary)] transition-transform duration-300 hover:scale-[1.04]"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {portfolioFilms.map((film, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={film.embedSrc}
                type="button"
                aria-label={film.title}
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-[var(--text-primary)]"
                    : "w-2.5 bg-[var(--line-soft)] hover:bg-[var(--text-muted)]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
