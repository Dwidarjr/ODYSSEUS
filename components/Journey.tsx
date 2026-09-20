import Image from "next/image";
import { site } from "@/data/site";

/** V — THE JOURNEY. A cinematic plate: the stone gateway opening onto Alexandria. */
export function Journey() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="surface-film relative overflow-hidden text-ivory lg:h-[clamp(34rem,38vw,50rem)]"
    >
      {/* Desktop plate — only one of the two plates is ever downloaded: the other
          sits in a display:none container and Next/Image lazy-loads by default. */}
      <div className="absolute inset-x-0 -inset-y-[9%] hidden lg:block" data-parallax="7">
        <Image
          src="/assets/journey-wide.png"
          alt="A stone arcade framing the sea and the distant lighthouse of Alexandria"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-[45%_50%]"
        />
      </div>

      {/* Mobile plate */}
      <div className="relative aspect-[773/1750] w-full overflow-hidden lg:hidden">
        <div className="absolute inset-x-0 -inset-y-[5%]" data-parallax="5">
          <Image
            src="/assets/journey-tall.png"
            alt="A stone archway opening onto the sea and the lighthouse of Alexandria"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-ink/70" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-[var(--gutter)] pb-[13%] lg:inset-y-0 lg:left-[57%] lg:right-0 lg:flex lg:flex-col lg:justify-center lg:px-0 lg:pb-0 lg:pr-[var(--gutter)]">
        <p className="meta mb-6 text-stone lg:mb-8" data-reveal="fade">
          V <span aria-hidden="true" className="mx-2 inline-block h-px w-6 translate-y-[-3px] bg-current align-middle" /> The Journey
        </p>
        <h2
          id="journey-title"
          className="font-display text-[clamp(2rem,9.2vw,2.6rem)] uppercase leading-[1.12] tracking-[0.06em] lg:text-[clamp(1.9rem,2.85vw,3.4rem)]"
          data-split
        >
          Good things
          <br />
          are built
          <br />
          one line
          <br />
          at a time.
        </h2>
        <span aria-hidden="true" className="mt-8 block h-px w-12 bg-ivory/40" data-reveal="fade" />
        <p className="meta mt-6 tracking-[0.42em] text-stone" data-reveal="fade">
          {site.name}
        </p>
      </div>

      <p
        className="meta absolute right-[var(--gutter)] top-[12%] z-10 hidden gap-5 text-ivory/70 lg:flex"
        data-reveal="fade"
      >
        <span aria-hidden="true" className="w-px self-stretch bg-ivory/35" />
        <span>
          Learn
          <br />
          Build
          <br />
          Iterate
        </span>
      </p>
    </section>
  );
}
