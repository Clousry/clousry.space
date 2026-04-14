"use client";

import { type TouchEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { SiteCopy } from "@/lib/site-copy";

const easeCurve = [0.22, 1, 0.36, 1] as const;
const swipeDistanceThreshold = 34;
const swipeVelocityThreshold = 0.42;

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
  const [loadedSlides, setLoadedSlides] = useState([0]);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef(0);
  const touchDeltaYRef = useRef(0);

  const activateSlide = (nextIndex: number) => {
    const normalizedIndex =
      (nextIndex + portfolioFilms.length) % portfolioFilms.length;

    setLoadedSlides((currentSlides) =>
      currentSlides.includes(normalizedIndex)
        ? currentSlides
        : [...currentSlides, normalizedIndex],
    );
    setActiveIndex(normalizedIndex);
  };

  const resetTouchGesture = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchStartTimeRef.current = null;
    touchDeltaXRef.current = 0;
    touchDeltaYRef.current = 0;
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) {
      resetTouchGesture();
      return;
    }

    touchStartXRef.current = event.touches[0].clientX;
    touchStartYRef.current = event.touches[0].clientY;
    touchStartTimeRef.current = performance.now();
    touchDeltaXRef.current = 0;
    touchDeltaYRef.current = 0;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) {
      return;
    }

    touchDeltaXRef.current = event.touches[0].clientX - touchStartXRef.current;
    touchDeltaYRef.current = event.touches[0].clientY - touchStartYRef.current;

    if (Math.abs(touchDeltaXRef.current) > Math.abs(touchDeltaYRef.current) * 1.1) {
      event.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchDeltaXRef.current;
    const verticalDistance = touchDeltaYRef.current;
    const touchStartTime = touchStartTimeRef.current;
    const elapsed =
      touchStartTime === null
        ? Number.POSITIVE_INFINITY
        : Math.max(performance.now() - touchStartTime, 1);
    const swipeVelocity = Math.abs(swipeDistance) / elapsed;
    const horizontalIntent =
      Math.abs(swipeDistance) > Math.abs(verticalDistance) * 1.1;
    const strongDistanceSwipe =
      Math.abs(swipeDistance) >= swipeDistanceThreshold;
    const quickSwipe =
      Math.abs(swipeDistance) >= 20 && swipeVelocity >= swipeVelocityThreshold;

    resetTouchGesture();

    if (!horizontalIntent || (!strongDistanceSwipe && !quickSwipe)) {
      return;
    }

    if (swipeDistance > 0) {
      activateSlide(activeIndex - 1);
      return;
    }

    activateSlide(activeIndex + 1);
  };

  const handlePrevious = () => {
    activateSlide(activeIndex - 1);
  };

  const handleNext = () => {
    activateSlide(activeIndex + 1);
  };

  const gestureHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: resetTouchGesture,
  };

  const railGestureHandlers = {
    onTouchStart: (event: TouchEvent<HTMLDivElement>) => {
      event.stopPropagation();
      handleTouchStart(event);
    },
    onTouchMove: (event: TouchEvent<HTMLDivElement>) => {
      event.stopPropagation();
      handleTouchMove(event);
    },
    onTouchEnd: (event: TouchEvent<HTMLDivElement>) => {
      event.stopPropagation();
      handleTouchEnd();
    },
    onTouchCancel: (event: TouchEvent<HTMLDivElement>) => {
      event.stopPropagation();
      resetTouchGesture();
    },
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

      <div className="relative select-none touch-pan-y" {...gestureHandlers}>
        <div className="overflow-hidden rounded-[32px]">
          <motion.div
            animate={{ x: `${activeIndex * -100}%` }}
            transition={{ duration: 0.55, ease: easeCurve }}
            className="flex will-change-transform"
          >
            {portfolioFilms.map(({ embedSrc, title }, index) => {
              const shouldRenderIframe = loadedSlides.includes(index);

              return (
                <div key={embedSrc} className="w-full shrink-0">
                  <div className="soft-card overflow-hidden rounded-[32px] p-3 sm:p-4">
                    <div className="showreel-shell relative aspect-video w-full overflow-hidden rounded-[28px]">
                      <div className="showreel-overlay pointer-events-none absolute inset-0 opacity-40" />

                      {shouldRenderIframe ? (
                        <iframe
                          src={embedSrc}
                          title={title}
                          loading={index === 0 ? "eager" : "lazy"}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                          className="absolute inset-0 h-full w-full border-0"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_46%),linear-gradient(135deg,rgba(14,19,28,0.72),rgba(5,7,11,0.92))]">
                          <div className="glass-panel inline-flex h-16 w-16 items-center justify-center rounded-full text-[var(--text-primary)]">
                            <Play
                              className="ml-1 h-6 w-6"
                              fill="currentColor"
                              strokeWidth={1.2}
                            />
                          </div>
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center sm:hidden">
                        <div
                          aria-label="Swipe portfolio videos"
                          className="liquid-pill pointer-events-auto inline-flex min-h-10 min-w-16 items-center justify-center rounded-full px-3"
                          {...railGestureHandlers}
                        >
                          <ArrowLeftRight
                            className="h-4 w-4 text-[var(--text-secondary)]"
                            strokeWidth={1.8}
                          />
                        </div>
                      </div>
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
              );
            })}
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
                onClick={() => activateSlide(index)}
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
