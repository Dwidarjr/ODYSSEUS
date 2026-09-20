import Image from "next/image";
import { site } from "@/data/site";
import { Laurel } from "./ui/Laurel";

/**
 * I — THE ODYSSEY
 *
 * Layers (back → front):
 *   1. plate  — ruins + column backdrop, anchored to the bottom of the frame
 *               (its top is plain night, so taller screens just show more sky)
 *   2. disc   — terracotta circle, anchored
 *   3. statue — transparent cutout, subtle independent parallax
 * Disc and statue share one box sized from the viewport height, so the figure
 * always fits the screen and the disc stays registered behind the head.
 *
 * Below `lg` the stage becomes an art-directed vertical composition.
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="hero-frame surface-film relative overflow-hidden bg-ink text-ivory lg:h-[100svh] lg:min-h-[640px]"
    >
      {/* ---------- Visual stage ---------- */}
      <div className="hero-stage relative w-full max-lg:overflow-hidden" data-hero="stage">
        {/* 1 — plate */}
        <div className="hero-plate absolute inset-0" data-hero="plate">
          <Image
            src="/assets/hero-background.jpg"
            alt=""
            fill
            preload
            sizes="(min-width: 1024px) 118vw, 400vw"
            className="hero-plate-mask object-cover object-[70%_100%] opacity-60 lg:object-fill lg:opacity-100"
          />
        </div>

        {/* 2 + 3 — disc and statue share the statue's box so their registration is exact */}
        <div
          className="statue-box absolute left-1/2 top-[64px] w-[min(108vw,600px)] -translate-x-[53%] lg:translate-x-0"
          style={{ aspectRatio: "1024 / 1536" }}
        >
          <div className="absolute inset-0" data-hero="disc">
            <div className="absolute left-[25.78%] top-[1.63%] w-[51.07%]" style={{ aspectRatio: "1" }}>
              <Image
                src="/assets/hero-me-disc.png"
                alt=""
                fill
                preload
                sizes="(min-width: 1024px) 32vh, 60vw"
                className="object-contain saturate-[0.88]"
              />
            </div>
          </div>

          <div className="absolute inset-0" data-hero="statue">
            <Image
              src="/assets/hero-me.png"
              alt="Marble statue of a young man in a draped toga holding a scroll, gazing into the distance"
              fill
              preload
              quality={85}
              sizes="(min-width: 1024px) 62vh, 110vw"
              className="object-contain"
            />
            <p
              aria-hidden="true"
              className="pedestal-inscription serif-caps absolute left-[22.2%] top-[89.6%] w-[52.5%] text-center text-[2.3cqw] leading-[1.5] tracking-[0.34em]"
            >
              {site.motto[0]}
              <br />
              {site.motto[1]}
              <span className="mx-auto mt-[0.6em] block h-px w-[14%] bg-current" />
            </p>
          </div>
        </div>

        {/* Mobile: dissolve the pedestal into the page */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-b from-transparent via-ink/75 to-ink lg:hidden"
        />
        <div aria-hidden="true" className="vignette pointer-events-none absolute inset-0 hidden lg:block" />
      </div>

      {/* ---------- Typography ---------- */}
      <div className="relative z-20 -mt-[14%] px-[var(--gutter)] pb-14 sm:-mt-[8%] lg:absolute lg:inset-0 lg:mt-0 lg:pb-0" data-hero="content">
        <div className="flex flex-col lg:h-full lg:w-[42%] lg:max-w-[560px] lg:pb-[5.5svh] lg:pt-[11.5svh]">
          <Laurel className="mb-5 hidden h-12 w-12 text-stone lg:block" />

          <p className="meta flex gap-4 text-ivory/80" data-intro>
            <span aria-hidden="true" className="w-px self-stretch bg-ivory/35" />
            <span>
              A<br className="max-lg:hidden" /> Code
              <br className="max-lg:hidden" /> Odyssey
            </span>
          </p>

          <h1
            id="hero-title"
            className="font-display mt-5 text-[clamp(2.7rem,13.6vw,4.4rem)] uppercase tracking-[0.07em] text-ivory lg:mt-[4.5svh] lg:text-[clamp(3.4rem,5.6vw,6.6rem)]"
            data-split
          >
            Hossam
            <br />
            Dwidar
          </h1>

          <span aria-hidden="true" className="mt-7 block h-px w-12 bg-ivory/50 lg:mt-[4svh]" data-intro />

          <p className="serif-caps mt-6 text-[0.82rem] leading-[2.1] tracking-[0.36em] text-ivory/80 lg:mt-[3.4svh]" data-intro>
            Web Developer
            <br />
            Frontend · Full-Stack
            <br />
            Digital Builder
          </p>

          <blockquote
            className="mt-9 font-serif text-[1.45rem] italic leading-[1.35] tracking-[0.02em] text-ivory/85 lg:mt-[5svh] lg:text-[clamp(1.3rem,1.6vw,1.65rem)]"
            data-intro
          >
            “I turn ideas into
            <br />
            <span className="pl-[0.45em]">digital experiences.”</span>
          </blockquote>

          <a
            href="#about"
            className="group mt-12 flex w-fit flex-col items-start gap-4 lg:mt-auto"
            data-intro
          >
            <span className="meta text-ivory/75 transition-colors group-hover:text-ivory">Scroll to begin</span>
            <span aria-hidden="true" className="scroll-line ml-px block h-12 w-px bg-ivory/25" />
          </a>
        </div>

        {/* Right-hand marginalia */}
        <p
          className="meta absolute right-[max(var(--gutter),12vw)] top-[50%] hidden gap-5 text-ivory/75 lg:flex"
          data-intro
        >
          <span aria-hidden="true" className="w-px self-stretch bg-ivory/35" />
          <span>
            The
            <br />
            Code
            <br />
            Continues
          </span>
        </p>

        <p
          className="meta mt-10 flex items-center justify-between text-ivory/60 lg:absolute lg:bottom-[5.5svh] lg:right-[var(--gutter)] lg:mt-0 lg:block"
          data-intro
        >
          <span className="lg:hidden">{site.location}</span>
          <span>{site.yearRoman}</span>
        </p>
      </div>
    </section>
  );
}
