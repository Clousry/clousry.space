"use client";

import { type TouchEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
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

const lastFilmIndex = portfolioFilms.length - 1;
const loopedPortfolioFilms = [
  {
    ...portfolioFilms[lastFilmIndex],
    actualIndex: lastFilmIndex,
    key: `loop-clone-start-${lastFilmIndex}`,
  },
  ...portfolioFilms.map((film, index) => ({
    ...film,
    actualIndex: index,
    key: `loop-slide-${index}`,
  })),
  {
    ...portfolioFilms[0],
    actualIndex: 0,
    key: "loop-clone-end-0",
  },
];

const escapeHtmlAttribute = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const getVideoIdFromEmbedSrc = (embedSrc: string) => {
  try {
    const { pathname } = new URL(embedSrc);

    return pathname.split("/").filter(Boolean).at(-1) ?? "";
  } catch {
    return "";
  }
};

const buildEmbedPreview = (embedSrc: string, title: string) => {
  const videoId = getVideoIdFromEmbedSrc(embedSrc);
  const playSrc = `${embedSrc}${embedSrc.includes("?") ? "&" : "?"}autoplay=1&playsinline=1`;
  const safeTitle = escapeHtmlAttribute(title);

  const posterMaxres = videoId
    ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    : "";
  const posterHq = videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : "";
  const posterMq = videoId
    ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head><style>
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:100%;height:100%;overflow:hidden;background:#05070b}
    .wrap{position:relative;display:flex;width:100%;height:100%;align-items:center;justify-content:center;text-decoration:none;overflow:hidden}
    .poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
    .overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(6,9,14,0.12),rgba(4,6,10,0.36))}
    .play{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:999px;background:rgba(10,14,20,0.72);border:1px solid rgba(255,255,255,0.12);box-shadow:0 18px 42px rgba(0,0,0,0.32);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);transition:transform 0.2s ease}
    .wrap:hover .play{transform:scale(1.08)}
  </style></head>
  <body>
    <a class="wrap" href="${playSrc}" aria-label="Play ${safeTitle}">
      ${posterMaxres ? `<img class="poster" src="${posterMaxres}" alt="" onerror="this.onerror=function(){this.onerror=null;this.src='${posterMq}'};this.src='${posterHq}'" />` : ""}
      <div class="overlay"></div>
      <span class="play">
        <svg viewBox="0 0 24 24" aria-hidden="true" width="30" height="30" fill="#f5f7fa" style="margin-left:3px;">
          <path d="M8 5.14v13.72L19 12 8 5.14Z"></path>
        </svg>
      </span>
    </a>
  </body>
</html>`;
};

type ShowreelPlaceholderProps = {
  content: SiteCopy["showreel"];
};

export function ShowreelPlaceholder({ content }: ShowreelPlaceholderProps) {
  const [trackIndex, setTrackIndex] = useState(1);
  const [loadedSlides, setLoadedSlides] = useState(() => new Set([0]));
  const [isTrackTransitionEnabled, setIsTrackTransitionEnabled] = useState(true);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef(0);
  const touchDeltaYRef = useRef(0);
  const activeIndex = loopedPortfolioFilms[trackIndex]?.actualIndex ?? 0;

  useEffect(() => {
    if (isTrackTransitionEnabled) {
      return;
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      setIsTrackTransitionEnabled(true);
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isTrackTransitionEnabled]);

  const markSlideAsLoaded = (slideIndex: number) => {
    setLoadedSlides((currentSlides) => {
      if (currentSlides.has(slideIndex)) {
        return currentSlides;
      }

      const next = new Set(currentSlides);
      next.add(slideIndex);
      return next;
    });
  };

  const moveToTrackIndex = (nextTrackIndex: number) => {
    const nextSlide = loopedPortfolioFilms[nextTrackIndex];

    if (!nextSlide) {
      return;
    }

    markSlideAsLoaded(nextSlide.actualIndex);
    setIsTrackTransitionEnabled(true);
    setTrackIndex(nextTrackIndex);
  };

  const activateSlide = (nextIndex: number) => {
    moveToTrackIndex(nextIndex + 1);
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
      moveToTrackIndex(trackIndex - 1);
      return;
    }

    moveToTrackIndex(trackIndex + 1);
  };

  const handlePrevious = () => {
    moveToTrackIndex(trackIndex - 1);
  };

  const handleNext = () => {
    moveToTrackIndex(trackIndex + 1);
  };

  const handleTrackAnimationComplete = () => {
    if (trackIndex === 0) {
      setIsTrackTransitionEnabled(false);
      setTrackIndex(portfolioFilms.length);
      return;
    }

    if (trackIndex === loopedPortfolioFilms.length - 1) {
      setIsTrackTransitionEnabled(false);
      setTrackIndex(1);
    }
  };

  const gestureHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: resetTouchGesture,
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
            animate={{ x: `${trackIndex * -100}%` }}
            transition={
              isTrackTransitionEnabled
                ? { duration: 0.55, ease: easeCurve }
                : { duration: 0 }
            }
            onAnimationComplete={handleTrackAnimationComplete}
            className="flex will-change-transform"
          >
            {loopedPortfolioFilms.map(({ actualIndex, embedSrc, key, title }) => {
              const shouldRenderIframe = loadedSlides.has(actualIndex);

              return (
                <div key={key} className="w-full shrink-0">
                  <div className="soft-card overflow-hidden rounded-[32px] p-3 sm:p-4">
                    <div className="showreel-shell relative aspect-video w-full overflow-hidden rounded-[28px]">
                      <div className="showreel-overlay pointer-events-none absolute inset-0 opacity-40" />

                      {shouldRenderIframe ? (
                        <iframe
                          src={embedSrc}
                          srcDoc={buildEmbedPreview(embedSrc, title)}
                          title={title}
                          loading={actualIndex === 0 ? "eager" : "lazy"}
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
