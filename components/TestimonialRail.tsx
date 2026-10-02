"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/data/testimonials";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The quotes themselves: a native scroll-snap rail — three cards to a spread on
 * desktop, one at a time on phones, swipeable by touch and steered by the two
 * marks below it. The arrows only translate a swipe into a click; scrolling the
 * rail by hand keeps the counter in step.
 */
export function TestimonialRail({ testimonials, platform }: { testimonials: Testimonial[]; platform: string }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  // Assumed scrollable so the controls render with the page; corrected on mount.
  const [edges, setEdges] = useState({ start: true, end: false, scrollable: true });

  /** Distance between two cards — read from the DOM, so the breakpoints stay in CSS. */
  const step = (rail: HTMLUListElement) => {
    const first = rail.firstElementChild as HTMLElement | null;
    const second = first?.nextElementSibling as HTMLElement | null;
    return first && second ? second.offsetLeft - first.offsetLeft : rail.clientWidth;
  };

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const width = step(rail);
    setIndex(width > 0 ? Math.min(testimonials.length - 1, Math.max(0, Math.round(rail.scrollLeft / width))) : 0);
    setEdges((prev) => {
      const next = { start: rail.scrollLeft <= 1, end: rail.scrollLeft >= max - 1, scrollable: max > 1 };
      return prev.start === next.start && prev.end === next.end && prev.scrollable === next.scrollable ? prev : next;
    });
  }, [testimonials.length]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    measure();
    rail.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => {
      rail.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({ left: direction * step(rail), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="relative z-10 mt-14 lg:mt-[clamp(3.5rem,5vw,5.5rem)]" data-reveal="up">
      <ul
        ref={railRef}
        tabIndex={0}
        aria-label="Client testimonials"
        className="rail-x flex snap-x snap-mandatory items-start gap-6 overflow-x-auto sm:items-stretch lg:gap-8"
      >
        {testimonials.map((t) => (
          <li key={t.id} className="flex shrink-0 basis-[86%] snap-start sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-4rem)/3)]">
            <figure className="testimonial-card flex w-full flex-col border border-[var(--rule-light)] px-7 py-9 lg:px-8 lg:py-10">
              <span aria-hidden="true" className="font-serif text-[5rem] leading-[0.42] text-terracotta/35">
                “
              </span>
              <blockquote className="mt-7 font-serif text-[1.12rem] leading-[1.55] text-ink/85">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-auto pt-10">
                <span aria-hidden="true" className="mb-6 block h-px w-10 bg-ink/20" />
                <div className="flex items-baseline justify-between gap-4">
                  <p className="serif-caps text-[1rem] tracking-[0.16em]" lang={t.nameLang} dir={t.nameLang === "ar" ? "rtl" : undefined}>
                    {t.name}
                  </p>
                  <p className="shrink-0 text-[0.62rem] tracking-[0.3em] text-ink/35">
                    <span aria-hidden="true">{"★".repeat(t.rating)}</span>
                    <span className="sr-only">Rated {t.rating} out of 5</span>
                  </p>
                </div>
                <p className="meta mt-2 text-ink/50">{t.service}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex items-end justify-between gap-6 lg:mt-12">
        <p className="meta text-ink/50">
          More reviews on
          <br />
          <span className="text-ink/80">{platform}</span>
        </p>

        <div className={`flex items-center gap-6 ${edges.scrollable ? "" : "hidden"}`}>
          <div className="flex gap-3">
            <button type="button" onClick={() => move(-1)} disabled={edges.start} aria-label="Previous testimonial" className="rail-arrow">
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" onClick={() => move(1)} disabled={edges.end} aria-label="Next testimonial" className="rail-arrow">
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <p className="meta text-ink/60" aria-live="polite">
            {pad(index + 1)} / {pad(testimonials.length)}
          </p>
        </div>
      </div>
    </div>
  );
}
