import Image from "next/image";
import { site } from "@/data/site";
import { SectionMark } from "./ui/SectionMark";

/** II — THE CALL. An art-catalogue spread on aged paper. */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="call-title"
      className="surface-paper relative overflow-hidden lg:min-h-[max(46rem,86svh)]"
    >
      <div className="relative z-10 grid grid-cols-1 px-[var(--gutter)] pb-6 pt-24 lg:grid-cols-12 lg:gap-x-8 lg:pb-32 lg:pt-[clamp(7rem,12vw,11rem)]">
        <SectionMark numeral="II" label="About" className="lg:col-span-2" />

        <div className="mt-10 lg:col-span-5 lg:mt-0 xl:col-span-4">
          <h2 id="call-title" className="font-display text-[clamp(3rem,13vw,4rem)] lg:text-[clamp(3rem,4.4vw,4.6rem)]" data-split>
            The <span className="max-lg:block">Call</span>
          </h2>

          <p className="meta mt-6 text-ink/70" data-reveal="up">
            {site.age} years old <span aria-hidden="true" className="mx-2 inline-block h-px w-6 translate-y-[-3px] bg-current align-middle" />
            <br className="xs:hidden" />
            {site.location}
          </p>

          <div className="mt-10 max-w-[30rem] space-y-6 font-serif text-[1.3rem] leading-[1.5] text-ink/85 lg:text-[clamp(1.2rem,1.35vw,1.4rem)]">
            <p data-reveal="up">
              I started with curiosity.
              <br />
              Then I discovered code.
            </p>
            <p data-reveal="up">
              I love taking an idea apart, writing the code
              <br className="hidden xl:block" /> and watching it become something real.
            </p>
            <p data-reveal="up">
              Now I’m on a journey to build, learn and ship —
              <br className="hidden xl:block" /> turning ideas into useful web experiences.
            </p>
          </div>

          <a
            href="#work"
            className="meta mt-12 inline-flex items-center gap-4 text-terracotta"
            data-reveal="up"
          >
            <span className="link-draw pb-1">See the labors</span>
            <span aria-hidden="true" className="arrow-nudge">
              →
            </span>
          </a>
        </div>
      </div>

      {/* The museum object — bust and halo bleed off the spread's right edge. */}
      <figure className="relative mt-4 lg:overflow-visible aspect-[1024/1100] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-[clamp(7.5rem,12vw,12rem)] lg:mt-0 lg:aspect-auto lg:w-[33%] xl:w-[42%]">
        <div className="absolute -bottom-[4%] -right-[14%] left-[14%] top-[-18%] lg:inset-x-0 lg:-top-[8%] lg:bottom-[-6%]" data-parallax="6">
          <Image
            src="/assets/call-bust.png"
            alt="Marble bust of a young man with curled hair, looking over his shoulder, before a pale stone halo"
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover object-[30%_85%] lg:object-contain lg:object-[100%_100%] lg:[mask-image:linear-gradient(to_right,#000_82%,transparent_100%)]"
            data-reveal="image"
          />
        </div>
        <figcaption
          className="absolute bottom-[9%] left-[var(--gutter)] font-serif text-[1.6rem] italic leading-[1.3] text-ink/85 lg:bottom-auto lg:left-[calc(100%-1rem)] lg:top-[38%] lg:w-max lg:text-[1.2rem] lg:text-ink/75"
          data-reveal="up"
        >
          “Curiosity
          <br />
          <span className="pl-[0.9em]">is a form</span>
          <br />
          <span className="pl-[0.4em]">of courage.”</span>
        </figcaption>
      </figure>
    </section>
  );
}
