"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * One controller wires every animation declared in the markup, so the
 * sections themselves stay server components:
 *
 *   data-intro          hero elements, revealed in the opening sequence
 *   data-hero="…"       hero layers (plate / disc / statue / content)
 *   data-split          headings revealed line by line through a mask
 *   data-reveal="fade" | "up" | "image"
 *   data-parallax="n"   drift ±n% while its section crosses the viewport
 *
 * Nothing is hidden unless the `motion` class was set on <html> (JS on and
 * reduced motion not requested), so content is always reachable.
 */
export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    (window as unknown as { __motionReady?: boolean }).__motionReady = true;
    if (!root.classList.contains("motion")) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    if (process.env.NODE_ENV === "development") {
      // Debug handle for inspecting timelines from the console.
      (window as unknown as { gsap?: typeof gsap }).gsap = gsap;
    }
    const mm = gsap.matchMedia();
    const splits: SplitText[] = [];
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      mm.add(
        {
          desktop: "(min-width: 1024px)",
          any: "(min-width: 0px)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          const ease = "power3.out";

          /* ---------- split headings ---------- */
          const hero = document.querySelector<HTMLElement>("#hero-title");
          gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
            const isHero = el === hero;
            const split = SplitText.create(el, {
              type: "lines",
              mask: "lines",
              linesClass: "split-line",
              autoSplit: true,
              onSplit(self) {
                gsap.set(el, { visibility: "visible" });
                return gsap.from(self.lines, {
                  yPercent: 110,
                  duration: isHero ? 1.6 : 1.3,
                  ease: "power4.out",
                  stagger: 0.1,
                  delay: isHero ? 0.55 : 0,
                  scrollTrigger: isHero ? undefined : { trigger: el, start: "top 88%", once: true },
                });
              },
            });
            splits.push(split);
          });

          /* ---------- hero opening sequence ---------- */
          const intro = gsap.timeline({ defaults: { ease } });
          intro
            .from("[data-hero='plate']", { opacity: 0, scale: 1.04, duration: 2.4, ease: "power2.out" }, 0)
            .from("[data-hero='disc']", { opacity: 0, scale: 0.94, transformOrigin: "55% 22%", duration: 2.2 }, 0.2)
            .from("[data-hero='statue']", { opacity: 0, y: 36, duration: 2.2 }, 0.35)
            .fromTo("[data-intro]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.4, stagger: 0.09 }, 0.9);

          /* ---------- hero scroll-out: statue drifts independently, disc stays anchored with the plate ---------- */
          const heroSection = document.querySelector("#home");
          if (heroSection) {
            const st = { trigger: heroSection, start: "top top", end: "bottom top", scrub: 0.6 };
            if (desktop) {
              gsap.to("[data-hero='stage']", { yPercent: 7, ease: "none", scrollTrigger: st });
              gsap.to("[data-hero='statue']", { yPercent: -2.5, ease: "none", scrollTrigger: st });
            } else {
              gsap.to("[data-hero='statue']", { yPercent: 4, ease: "none", scrollTrigger: st });
              gsap.to("[data-hero='disc']", { yPercent: 6, ease: "none", scrollTrigger: st });
            }
            gsap.to("[data-hero='content']", { opacity: 0.15, yPercent: -4, ease: "none", scrollTrigger: { ...st, start: "top+=10% top" } });
          }

          /* ---------- generic reveals ---------- */
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
            const kind = el.dataset.reveal;
            const trigger = { trigger: el, start: "top 90%", once: true };
            if (kind === "image") {
              gsap.set(el, { opacity: 1 });
              gsap.fromTo(
                el,
                { clipPath: "inset(12% 0% 0% 0%)", scale: 1.06 },
                { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 2, ease: "power2.out", scrollTrigger: trigger }
              );
            } else if (kind === "up") {
              gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.4, ease, scrollTrigger: trigger });
            } else {
              gsap.to(el, { opacity: 1, duration: 1.6, ease: "power1.out", scrollTrigger: trigger });
            }
          });

          /* ---------- parallax ---------- */
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const amount = Number(el.dataset.parallax) || 6;
            const section = el.closest("section") ?? el;
            gsap.fromTo(
              el,
              { yPercent: -amount },
              {
                yPercent: amount,
                ease: "none",
                scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 },
              }
            );
          });
        }
      );
      ScrollTrigger.refresh();
    };

    // Split only once webfonts are in, so line breaks are measured correctly.
    if (document.fonts) document.fonts.ready.then(run);
    else run();

    return () => {
      cancelled = true;
      splits.forEach((s) => s.revert());
      mm.revert();
    };
  }, []);

  return null;
}
